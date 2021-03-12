import React, { useState } from "react";
import { NativeRouter, Route, Link } from "react-router-native";
import io from "socket.io-client";
import { Main } from "./screens/Main/Main";
import mockData from "./mockData.json";
import { Room } from "./screens/Room/Room";

export default function App() {
  const [recivedSocket, setRecivedSocket] = useState<any>();

  const socket = io("ws://192.168.1.42:3000");

  socket.on("message", (msg: any) => {
    setRecivedSocket(msg);
  });

  return (
    <NativeRouter>
      <Route exact path="/">
        <Main
          patientsSocketData={recivedSocket && JSON.parse(recivedSocket)}
          patientData={mockData}
        />
      </Route>
      <Route path="/room">
        <Room />
      </Route>
    </NativeRouter>
  );
}
