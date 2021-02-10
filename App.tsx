import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";

export default function App() {
  const [recivedSocket, setRecivedSocket] = useState<String>();

  const socket = io("ws://192.168.1.42:3000");

  socket.on("message", (msg: any) => {
    setRecivedSocket(msg);
  });

  return (
    <View style={styles.container}>
      <Text>Text recived: {recivedSocket}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
