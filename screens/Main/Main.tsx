import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { Avatar, ListItem, Icon, Badge } from "react-native-elements";
import { BaseHeader } from "../../components/Header/BaseHeader";

interface PatientData {
  room: string;
  name: string;
}

interface PatientsSocketData {
  room: string;
  value: string;
  // temperature?: string;
  // bloodPreasure?: string;
  // heartRate?: string;
  // breathingFrequency?: string;
}

interface PatientState {
  room: string;
  value: string;
  name: string;
  // temperature?: string;
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
    if (patientsSocketData) {
      patientData.forEach((patient, idx) => {
        setPatientState((prev: any) => [
          ...prev,
          {
            room: patient.room,
            name: patient.name,
            value:
              patient.room === patientsSocketData.room
                ? patientsSocketData.value
                : prev.value,
          },
        ]);
      });
    }
  }, [patientsSocketData]);

  return (
    <View style={styles.container}>
      <BaseHeader />

      {!!patientState &&
        patientState.map((patient, idx) => {
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
              <Text style={styles.patientConstants}>{patient.value}</Text>

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
