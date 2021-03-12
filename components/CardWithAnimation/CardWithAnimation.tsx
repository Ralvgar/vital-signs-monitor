import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, ListItem, Icon } from "react-native-elements";
import { Link, useHistory } from "react-router-native";
import { PatientData } from "../../screens/Main/Main";

interface Props {
  patient: PatientData;
}

export const CardWithAnimation = ({ patient }: Props) => {
  const [
    intermitentAnimationIsActive,
    setIntermitentAnimationIsActive,
  ] = useState<boolean>(false);
  const history = useHistory();

  const intermitentIconAnimationAnimatedValue = useRef(new Animated.Value(0))
    .current;
  const scaleAnimated = useRef(new Animated.Value(0)).current;

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

  const pressInAnimation = () => {
    Animated.timing(scaleAnimated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const pressOutAnimation = () => {
    Animated.timing(scaleAnimated, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleOnTouchOnCard = () => {
    history.push("/room");
  };

  return (
    <TouchableOpacity
      onPress={handleOnTouchOnCard}
      onPressIn={pressInAnimation}
      onPressOut={pressOutAnimation}
      activeOpacity={1}
      style={{
        transform: [
          {
            scale: scaleAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [1.0, 1.1],
            }),
          },
        ],
      }}
    >
      <Card containerStyle={styles.card}>
        <Animated.View
          style={{
            opacity: intermitentIconAnimationAnimatedValue,
            zIndex: 5,
          }}
        >
          <Icon
            name="exclamation-triangle"
            type="font-awesome-5"
            color="#b3323d"
            size={20}
            containerStyle={{
              zIndex: 5,
              position: "absolute",
              top: -5,
              right: -3,
            }}
          />
        </Animated.View>
        <ListItem key={patient.name}>
          <Avatar
            rounded
            title={patient.room}
            titleStyle={{ color: "#3c4775", fontWeight: "bold" }}
            placeholderStyle={{
              backgroundColor: "#e8e9ff",
            }}
            size={50}
          />
        </ListItem>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: "column",
  },
});
