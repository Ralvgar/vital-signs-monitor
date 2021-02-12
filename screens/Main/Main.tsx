import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import { BaseHeader } from "../../components/Header/BaseHeader";

interface PatientData {
  room: string;
  name: string;
}

interface PatientsSocketData {
  room: string;
  sensor: "heart" | "temperature";
  value: string;
  // temperature?: string;
  // bloodPreasure?: string;
  // heartRate?: string;
  // breathingFrequency?: string;
}

interface PatientState {
  room: string;
  heart?: string;
  temperature?: string;
  //temperature?: string;
  // bloodPreasure?: string;
  // heartRate?: string;
  // breathingFrequency?: string;
}

interface Props {
  patientsSocketData: PatientsSocketData;
  patientData: PatientData[];
}

export const Main = ({ patientsSocketData, patientData }: Props) => {
  const [user, setUser] = useState<any>();
  const [patientState, setPatientState] = useState<PatientState[]>([]);

  console.log(patientState);

  useEffect(() => {
    if (!patientsSocketData) {
      return;
    }
    setPatientState((prevState) => {
      const foundPatientState = prevState.find(
        (state: PatientState) => state.room === patientsSocketData.room
      );
      if (!foundPatientState) {
        return [
          ...prevState,
          {
            room: patientsSocketData.room,
            [patientsSocketData.sensor]: patientsSocketData.value,
          },
        ];
      } else {
        return [
          ...prevState.filter((item) => item.room !== patientsSocketData.room),
          Object.assign({}, foundPatientState, {
            [patientsSocketData.sensor]: patientsSocketData.value,
          }),
        ];
      }
    });
  }, [patientsSocketData]);

  const renderRoomValue = (room: string, sensor: "heart" | "temperature") => {
    const patientData = patientState.find(
      (patientsSocketDataItem) => patientsSocketDataItem.room === room
    );
    return patientData && patientData[sensor] ? patientData[sensor] : "-";
  };

  return (
    <View style={styles.container}>
      <BaseHeader />

      {!!patientData &&
        patientData.map((patient, idx) => {
          return (
            <ListItem key={patient.name} style={styles.patient} bottomDivider>
              <Avatar
                rounded
                title={patient.room}
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{ alignSelf: "stretch" }}
                  onPress={() => setUser(patient.name)}
                >
                  {patient.name}
                </ListItem.Title>
              </ListItem.Content>

              <Icon name="heartbeat" type="font-awesome" color="#cc1f2d" />
              <Text style={styles.patientConstants}>
                {renderRoomValue(patient.room, "heart")}
                {renderRoomValue(patient.room, "temperature")}
              </Text>
              <ListItem.Chevron />
            </ListItem>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  patient: {},
  patientConstants: {
    paddingRight: 20,
  },
});
