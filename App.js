import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Animated,
  Easing,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const titleAnimation = useRef(new Animated.Value(200)).current;
  const textInputHeight = useRef(0);

  const [fontsLoaded] = useFonts({
    ProtestRiot: require("./assets/fonts/ProtestRiot-Regular.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const targetValue =
      textInputHeight.current > 250 && text !== "" ? 100 : 200;
    Animated.timing(titleAnimation, {
      toValue: targetValue,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [text, titleAnimation]);

  const updateText = (newText) => {
    const words = newText.trim().split(" ");
    const newCount = newText.trim() === "" ? 0 : words.length;
    setCount(newCount);
    setText(newText);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  if (!fontsLoaded) {
    return null; // Add a loading indicator or alternative content while fonts are loading
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Animated.View style={[styles.titleContainer, { top: titleAnimation }]}>
          <Text style={styles.title}>Word Counter</Text>
        </Animated.View>
        <TextInput
          style={styles.textInput}
          placeholder="Type or Paste..."
          textAlign="center"
          onChangeText={(newText) => updateText(newText)}
          defaultValue={text}
          multiline={true}
          numberOfLines={null}
          onContentSizeChange={(e) => {
            textInputHeight.current = e.nativeEvent.contentSize.height;
          }}
        />
        <Text style={styles.text}>{count}</Text>
        <Text style={styles.signature}>Powered by Heet Shah © </Text>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3d0e8",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    position: "absolute",
  },

  title: {
    fontSize: 45,
    fontFamily: "ProtestRiot",
    color: "#3B3A3A",
  },

  textInput: {
    borderWidth: 0.5,
    borderColor: "#333333",
    borderRadius: 7,
    width: "65%",
    height: "auto",
    maxHeight: 350,
    color: "black",
    fontSize: 23,
    fontFamily: "Poppins",
    padding: 5,
  },

  text: {
    margin: 20,
    color: "#000080",
    fontSize: 30,
    fontFamily: "Poppins",
  },

  signature: {
    position: "absolute",
    bottom: 50,
    color: "#333333",
    fontSize: 18,
    textAlign: "center",
  },
});
