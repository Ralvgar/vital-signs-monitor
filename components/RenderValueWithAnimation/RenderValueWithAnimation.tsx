import React, { useEffect, useState, useMemo, useRef } from "react";
import { StyleSheet, Animated, Text } from "react-native";
import { Badge } from "react-native-elements";
import { SensorValues } from "../../screens/Main/Main";

export const RenderValueWithAnimation = ({
  sensorValue,
  typeOfValue,
}: {
  sensorValue: string | undefined;
  typeOfValue: SensorValues;
}) => {
  const [
    intermitentAnimationIsActive,
    setIntermitentAnimationIsActive,
  ] = useState<boolean>(false);
  const onValueChangeAnimatedValue = new Animated.Value(0);
  const intermitentIconAnimationAnimatedValue = useRef(new Animated.Value(0))
    .current;

  useEffect(() => {
    if (!!sensorValue) {
      const sensorNumber = parseInt(sensorValue);
      if (typeOfValue === "heartRate" && sensorNumber <= 50) {
        setIntermitentAnimationIsActive(true);
      } else if (typeOfValue === "breathingFrequency" && sensorNumber <= 50) {
        setIntermitentAnimationIsActive(true);
      } else if (typeOfValue === "bloodPreasure" && sensorNumber <= 100) {
        setIntermitentAnimationIsActive(true);
      } else {
        setIntermitentAnimationIsActive(false);
      }
    }
  }, [sensorValue]);

  useEffect(() => {
    intermitentIconAnimation.stop();
    intermitentIconAnimationAnimatedValue.setValue(0);
    intermitentAnimationIsActive && intermitentIconAnimation.start();
  }, [intermitentAnimationIsActive]);

  const intermitentIconAnimation = useMemo(
    () =>
      Animated.loop(
        Animated.spring(intermitentIconAnimationAnimatedValue, {
          toValue: 1,
          useNativeDriver: true,
          delay: 1000,
        })
      ),
    []
  );

  const onValueChange = () => {
    Animated.timing(onValueChangeAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => onValueChangeAnimatedValue.setValue(0));
  };

  return (
    <Animated.View
      style={[
        styles.onChangeAnimation,
        {
          backgroundColor: onValueChangeAnimatedValue.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [
              "#ffffff",
              "#cf2626",
              "#ffffff",
              "#cf2626",
              "#ffffff",
            ],
          }),
        },
      ]}
    >
      <Text onTextLayout={onValueChange} style={styles.textValue}>
        {sensorValue}
      </Text>
      <Animated.View
        style={{
          opacity: intermitentIconAnimationAnimatedValue,
        }}
      >
        <Badge
          status="error"
          containerStyle={{
            position: "absolute",
            top: -26,
            right: -10,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  onChangeAnimation: {
    paddingHorizontal: 5,
    borderRadius: 25,
  },
  textValue: {
    fontSize: 18,
  },
});
