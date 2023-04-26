import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../Theme";
import { StatusBar } from "expo-status-bar";
import { ref, onValue, push } from "firebase/database";
import { db } from "../../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoHome({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const getCategoryList = async () => {
    const userUID = await AsyncStorage.getItem("uid");
    const dbRef = ref(db, `users/${userUID}/categories`);
    onValue(dbRef, (snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        const categoryId = childSnapshot.key;
        const categoryData = childSnapshot.val();
        categories.push({ id: categoryId, ...categoryData });
      });
      setCategoryList(categories);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  const handleAddCategory = async () => {
    const userUID = await AsyncStorage.getItem("uid");
    if (categoryName.trim()) {
      push(ref(db, `users/${userUID}/categories`), {
        name: categoryName,
      });
      setCategoryName("");
    } else {
      alert("Category name cannot be empty");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.heading}>Your Todos</Text>

      <ScrollView style={styles.noteWrapper}>
        {loading ? (
          <View style={{ marginTop: 15 }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null}
        {categoryList.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CategoryTodo", { category: item })
            }
            key={index}
            style={styles.note}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#FFF" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.footerContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#a9a9a9"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleAddCategory}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  footerContainer: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.backgroundColor,
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    marginRight: 8,
    fontSize: 18,
  },
  noteWrapper: {
    padding: 25,
  },
  note: {
    backgroundColor: Theme.lightBlackColor,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    paddingHorizontal: 25,
    paddingTop: 35,
  },
  sendButton: {
    backgroundColor: Theme.primaryColor,
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});
