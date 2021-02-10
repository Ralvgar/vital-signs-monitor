import React, { useState } from "react";
import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView } from "react-native";
import io from "socket.io-client";
import { Main } from "./screens/Main/Main";

export default function App() {
  const [recivedSocket, setRecivedSocket] = useState<String>();

  const socket = io("ws://192.168.1.42:3000");

  socket.on("message", (msg: any) => {
    setRecivedSocket(msg);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Main />
      </View>

      <Text>Text recived: {recivedSocket}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    alignItems: "stretch",
  }, 
  mainContainer: {
  },
});
