import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // delete todo
  // 삭제 이모티콘 터치 시 해당 todo 삭제
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState(""); // js, react, ct
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
  };

  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    // 1. id 값을 받아서 해당 배열 요소를 제외한 나머지를 새로운 배열로 받는다.
    // 2. setTodos
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 클릭!"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  const setEdit = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    // 1. id 값받아서 해당 배열의 요소를 찾는다. idx 찾기
    // 2. todos[idx].text = editText;
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  const setDone = (id) => {
    // 1. id를 매개변수로 받는다.
    // 2. id에 해당하는 배열의 요소를 찾는다.
    // 3. 그 배열의 요소의 isDone 값을 토글링한 후에 setTodos.
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  const setCat = async (cat) => {
    console.log("cat:", cat);
    setCategory(cat);
    await AsyncStorage.setItem("category", cat);
  };

  useEffect(() => {
    // 현재의 최신 todos를 AsyncStorage에 저장
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos"); // todos 배열
      const resp_cat = await AsyncStorage.getItem("category"); // undefined / null

      setTodos(JSON.parse(resp_todos));
      setCategory(resp_cat ?? "js");
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setCat("js")}
            style={{
              ...styles.tab,
              backgroundColor: category === "js" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>Javascript</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCat("react")}
            style={{
              ...styles.tab,
              backgroundColor: category === "react" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCat("ct")}
            style={{
              ...styles.tab,
              backgroundColor: category === "ct" ? "#0FBCF9" : "grey",
            }}
          >
            <Text style={styles.tabText}>Coding Test</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            onSubmitEditing={addTodo}
            onChangeText={setText}
            value={text}
            placeholder="Enter your task"
            style={styles.input}
          />
        </View>
        <ScrollView>
          {todos.map((todo) => {
            if (category === todo.category) {
              return (
                <View key={todo.id} style={styles.task}>
                  {todo.isEdit ? (
                    <TextInput
                      onSubmitEditing={() => editTodo(todo.id)}
                      onChangeText={setEditText}
                      value={editText}
                      style={{ backgroundColor: "white", flex: 1 }}
                    />
                  ) : (
                    <Text
                      style={{
                        textDecorationLine: todo.isDone
                          ? "line-through"
                          : "none",
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
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    backgroundColor: "#0FBCF9",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "30%",
    alignItems: "center",
  },
  tabText: {
    fontWeight: "600",
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
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
