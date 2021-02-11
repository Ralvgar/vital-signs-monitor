import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import io from "socket.io-client";
import { Main } from "./screens/Main/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";
import mockData from "./mockData.json";

export default function App() {
  const [recivedSocket, setRecivedSocket] = useState<any>();

  const socket = io("ws://192.168.1.42:3000");

  socket.on("message", (msg: any) => {
    setRecivedSocket(msg);
  });

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.mainContainer}>
        <Main
          patientsSocketData={recivedSocket && JSON.parse(recivedSocket)}
          patientData={mockData}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bdbdbd",
    alignItems: "stretch",
  },
  mainContainer: {},
});
