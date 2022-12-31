import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Todo({
  setEditText,
  editText,
  todo,
  editTodo,
  setDone,
  setEdit,
  deleteTodo,
}) {
  return (
    <View key={todo.id} style={styles.task}>
      {todo.isEdit ? (
        <TextInput
          onSubmitEditing={() => editTodo(todo.id)}
          onChangeText={setEditText}
          defaultValue={todo.text}
          style={{ backgroundColor: "white", flex: 1 }}
        />
      ) : (
        <Text
          style={{
            textDecorationLine: todo.isDone ? "line-through" : "none",
          }}
        >
          {todo.text}
        </Text>
      )}

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setDone(todo.id)}>
          <AntDesign name="checksquare" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEdit(todo.id)}>
          <Feather
            style={{ marginLeft: 10 }}
            name="edit"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <AntDesign
            style={{ marginLeft: 10 }}
            name="delete"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
