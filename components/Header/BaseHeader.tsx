import React from "react";
import { Header } from "react-native-elements";

export const BaseHeader = () => {
  return (
    <>
      <Header
        leftComponent={{ icon: "menu", color: "#f0f0f0" }}
        centerComponent={{
          text: "Vital Signs Monitor",
          style: { color: "#f0f0f0" },
        }}
        rightComponent={{ icon: "home", color: "#f0f0f0" }}
      />
    </>
  );
};
