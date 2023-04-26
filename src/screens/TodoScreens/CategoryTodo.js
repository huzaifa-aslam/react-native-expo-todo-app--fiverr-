import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../Theme";
import { StatusBar } from "expo-status-bar";

export default function CategoryTodo({route,navigation}) {

    const { title } = route.params

    const [note, setNote] = useState('');
    const [noteList, setNoteList] = useState([]);
  
    const handleAddNote = () => {
        if (note.trim()) {
          setNoteList([...noteList, note]);
          setNote('');
        }
        else{
            alert('Cannot be empty')
        }
      };

    
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text numberOfLines={1} style={styles.heading}>
      {title}
      </Text>
      <ScrollView style={styles.noteWrapper}>
        {noteList.map((note, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("SubCategoryTodo", { title: note })}
            key={index}
            style={styles.note}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#FFF" }}>
              {note}
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
  footerContainer: {
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize:18
  },
  noteWrapper:{
    padding:25
  },
  note: {
    backgroundColor: Theme.lightBlackColor,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  heading:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    paddingHorizontal:25,
    paddingTop:35
  },
  sendButton: {
    backgroundColor: Theme.primaryColor,
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  subheading:{
    color:'grey',
    paddingHorizontal:25,
    marginTop:5,
    fontSize:15
  }
});

