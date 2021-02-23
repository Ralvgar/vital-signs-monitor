import React from "react";
import { StyleSheet, Animated, Text } from "react-native";
import { PatientsSocketData, SensorValues } from "../types/types";

export const RenderValueWithAnimation = ({
  patientState,
  dataValue,
  sensorValue,
}: {
  patientState: any;
  dataValue: any;
  sensorValue: any;
}) => {
  const animatedValue = new Animated.Value(0);

  const renderRoomValue = (room: string, sensor: SensorValues) => {
    const patientData = patientState.find(
      (patientsSocketDataItem: PatientsSocketData) =>
        patientsSocketDataItem.room === room
    );
    return patientData && patientData[sensor] ? patientData[sensor] : "";
  };

  const onValueChange = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue(0);
    });
  };

  return (
    <Animated.View
      style={[
        styles.onChangeAnimation,
        {
          backgroundColor: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["#ffffff", "#cf2626", "#ffffff"],
          }),
        },
      ]}
    >
      <Text onTextLayout={onValueChange}>
        {renderRoomValue(dataValue, sensorValue)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  onChangeAnimation: {
    paddingHorizontal: 5,
    borderRadius: 25,
  },
});
