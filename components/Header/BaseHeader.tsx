import React from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";

export const BaseHeader = () => {
  return (
    <>
      <Header
        statusBarProps={{
          animated: true,
          backgroundColor: "#f2f6fe",
          barStyle: "dark-content",
        }}
        leftComponent={{
          icon: "menu",

          color: "#3c4775",
          size: 30,
          style: styles.leftComponent,
        }}
        centerComponent={{
          text: "Vital Signs Monitor",
          style: styles.centerComponent,
        }}
        rightComponent={{
          icon: "clinic-medical",
          type: "font-awesome-5",
          color: "#3c4775",
          style: styles.leftComponent,
          size: 30,
        }}
        containerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f6fe",
    color: "#3c4775",
  },
  leftComponent: {
    shadowColor: "black",
    borderRadius: 5,
    backgroundColor: "#e8e9ff",
    padding: 10,
    margin: 8,
    fontSize: 17,
  },
  centerComponent: {
    padding: 8,
    paddingBottom: 20,
    marginTop: 10,
    color: "#3c4775",
    fontSize: 17,
    fontWeight: "bold",
  },
});
