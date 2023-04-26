import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../Theme";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ref, push, onValue } from "firebase/database";
import { db } from "../../../config/firebase";

export default function CategoryTodo({ route, navigation }) {
  const { category } = route.params;
  const [note, setNote] = useState("");
  const [noteList, setNoteList] = useState([]);
  useEffect(() => {
    getSubCategoryList();
  }, []);
  const getSubCategoryList = async () => {
    const userUID = await AsyncStorage.getItem("uid");
    const dbRef = ref(
      db,
      `users/${userUID}/categories/${category.id}/subCategories`
    );
    onValue(dbRef, (snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        const categoryId = childSnapshot.key;
        const categoryData = childSnapshot.val();
        categories.push({ id: categoryId, ...categoryData });
      });
      setNoteList(categories);
    });
  };
  const handleAddNote = () => {
    if (note.trim()) {
      addSubcategory(category.id, note);
      setNoteList([...noteList, note]);
      setNote("");
    } else {
      alert("Cannot be empty");
    }
  };
  const addSubcategory = async (categoryId, subcategoryName) => {
    const userUID = await AsyncStorage.getItem("uid");
    push(ref(db, `users/${userUID}/categories/${categoryId}/subCategories`), {
      name: subcategoryName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text numberOfLines={1} style={styles.heading}>
        {category?.name}
      </Text>
      <ScrollView style={styles.noteWrapper}>
        {noteList.map((note, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SubCategoryTodo", {
                subCategory: { ...note, categoryId: category.id },
              })
            }
            key={index}
            style={styles.note}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#FFF" }}>
              {note?.name}
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
            onChangeText={(text) => setNote(text)}
            value={note}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAddNote}>
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
  subheading: {
    color: "grey",
    paddingHorizontal: 25,
    marginTop: 5,
    fontSize: 15,
  },
});
