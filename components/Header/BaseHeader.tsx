import React from "react";
import { Header } from "react-native-elements";

export const BaseHeader = () => {
  return (
    <>
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "Vital Signs Monitor",
          style: { color: "#fff" },
        }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    </>
  );
};
