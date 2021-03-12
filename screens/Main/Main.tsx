import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem, Icon, Card } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CardWithAnimation } from "../../components/CardWithAnimation/CardWithAnimation";
import { BaseHeader } from "../../components/Header/BaseHeader";
import { RenderValueWithAnimation } from "../../components/RenderValueWithAnimation/RenderValueWithAnimation";

export interface PatientData {
  room: string;
  name: string;
}

export interface PatientsSocketData {
  room: string;
  sensor: SensorValues;
  value: string;
}

export type SensorValues =
  | "heartRate"
  | "bloodPreasure"
  | "breathingFrequency"
  | "oxygenSaturation";

//  pulso (ppm), tension: bloodPreasure (120/70) y saturacion(%)

interface PatientState {
  room: string;
  oxygenSaturation?: string;
  bloodPreasure?: string;
  heartRate?: string;
  breathingFrequency?: string;
}

interface Props {
  patientsSocketData: PatientsSocketData;
  patientData: PatientData[];
}

export const Main = ({ patientsSocketData, patientData }: Props) => {
  const [user, setUser] = useState<any>();
  const [patientState, setPatientState] = useState<PatientState[]>([]);

  const renderRoomValue = (room: string, sensor: SensorValues) => {
    const patientData = patientState.find(
      (patientsSocketDataItem: PatientState) =>
        patientsSocketDataItem.room === room
    );
    return patientData && patientData[sensor] ? patientData[sensor] : "";
  };

  useEffect(() => {
    if (!patientsSocketData) {
      return;
    }
    setPatientState((prevState) => {
      const newState = [...prevState];
      const foundIndex = newState.findIndex(
        (state) => state.room === patientsSocketData.room
      );

      if (foundIndex === -1) {
        return [
          ...newState,
          {
            room: patientsSocketData.room,
            [patientsSocketData.sensor]: patientsSocketData.value,
          },
        ];
      } else {
        newState[foundIndex] = {
          ...newState[foundIndex],
          [patientsSocketData.sensor]: patientsSocketData.value,
        };
        return newState;
      }
    });
  }, [patientsSocketData]);

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.mainContainer}>
        <BaseHeader />
        <View style={styles.cardsContainer}>
          {!!patientData &&
            patientData.map((patient, idx) => {
              return <CardWithAnimation patient={patient} key={idx} />;
            })}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6fe",
    color: "#3c4775",
    alignItems: "stretch",
  },
  mainContainer: {},
  cardsContainer: {
    backgroundColor: "#e8e9ff",
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderRadius: 30,
    paddingTop: 20,
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

// return (
//   <View key={patient.name + idx + idx}>
//     <ListItem key={patient.name}>
//       <Avatar
//         rounded
//         title={patient.room}
//         placeholderStyle={{
//           backgroundColor: "#499af7",
//         }}
//         source={{
//           uri:
//             "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
//         }}
//       />
//       <ListItem.Content>
//         <ListItem.Title
//           style={styles.patientNameText}
//           onPress={() => setUser(patient.name)}
//         >
//           {patient.name}
//         </ListItem.Title>
//       </ListItem.Content>
//     </ListItem>
//     <ListItem key={patient.name + idx} bottomDivider>
//       <View style={styles.valuesWithIcons}>
//         <Icon
//           name="tint"
//           type="font-awesome-5"
//           color="#cc1f2d"
//           style={styles.icon}
//         />
//         <RenderValueWithAnimation
//           sensorValue={renderRoomValue(patient.room, "bloodPreasure")}
//           typeOfValue={"bloodPreasure"}
//         />
//       </View>
//       <View style={styles.valuesWithIcons}>
//         <Icon
//           name="lungs"
//           type="font-awesome-5"
//           color="#499af7"
//           style={styles.icon}
//         />
//         <RenderValueWithAnimation
//           sensorValue={renderRoomValue(
//             patient.room,
//             "breathingFrequency"
//           )}
//           typeOfValue={"breathingFrequency"}
//         />
//       </View>
//       <View style={styles.valuesWithIcons}>
//         <Icon
//           name="heartbeat"
//           type="font-awesome-5"
//           color="#cc1f2d"
//           style={styles.icon}
//         />
//         <RenderValueWithAnimation
//           sensorValue={renderRoomValue(patient.room, "heartRate")}
//           typeOfValue={"heartRate"}
//         />
//       </View>
//     </ListItem>
//   </View>
// );
