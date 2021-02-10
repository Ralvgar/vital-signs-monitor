import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";
import { Avatar } from "react-native-elements";

export default function App() {
  const [recivedSocket, setRecivedSocket] = useState<String>();

  const socket = io("ws://192.168.1.42:3000");

  socket.on("message", (msg: any) => {
    setRecivedSocket(msg);
  });

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{
          uri: "https://source.unsplash.com/user/9IZIP5KEt3E/128x90",
        }}
      />
      <Text>Text recived: {recivedSocket}</Text>
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
