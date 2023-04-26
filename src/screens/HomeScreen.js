import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Theme from "../Theme";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import { db } from "../../config/firebase";
import FullButton from "../../components/FullButton";
import {signInAnonymously} from "firebase/auth";
import { set, ref, serverTimestamp } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebase";

export default function ChatScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateUser = async () => {
    setIsLoading(true);
      try {
        const userCredential = await signInAnonymously(auth);
        const { uid } = userCredential.user;
        await AsyncStorage.setItem("uid", uid);
        await set(ref(db, `users/${uid}`), {
          name: "Anonymous User",
          createdAt: serverTimestamp(),
        });
        console.log(uid);
      } catch (error) {
        console.error(error);
      }
    setIsLoading(false);
    navigation.replace('TodoHome')
  };

  const getID = async ()=>{
    const userUID = await AsyncStorage.getItem("uid");
    if (userUID) {
      console.log(`Found your logged in data in Async storage - User UID: ${userUID}`);
      navigation.replace('TodoHome')
    }
    else{
      console.log('UID Not Found')
    }
  }

  useEffect(() => {
    getID()
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.center}>
        <Lottie
          style={{ height: 80, width: 100 }}
          source={require("../../assets/welcome.json")}
          autoPlay
          loop
        />
           {isLoading === true ? (
            <View style={{ marginTop: 15 }}>
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : null}
        <View style={{ width: "100%", marginTop: 25 }}>
          <FullButton handlePress={handleCreateUser} type={4} label={"Proceed"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  center: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
  },
  errorWrapper: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc035e",
    paddingVertical: 10,
  },
  errorText: {
    fontFamily: Theme.FSMedium,
    color: Theme.textColor,
    fontSize: 16,
  },

});

