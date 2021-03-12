import React from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";

export const Room = () => {
  return (
    <View>
      <Link to={"/"}>
        <Text>Volver</Text>
      </Link>
    </View>
  );
};
