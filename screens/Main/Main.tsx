import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import { BaseHeader } from "../../components/Header/BaseHeader";
import { RenderValueWithAnimation } from "../../components/RenderValueWithAnimation/RenderValueWithAnimation";
import { PatientsSocketData } from "../../components/types/types";

interface PatientData {
  room: string;
  name: string;
}

//  pulso (ppm), tension: bloodPreasure (120/70) y saturacion(%)

interface PatientState {
  room: string;
  heart?: string;
  temperature?: string;
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

  console.log(patientState);

  return (
    <View>
      <BaseHeader />

      {!!patientData &&
        patientData.map((patient, idx) => {
          return (
            <View>
              <ListItem key={patient.name}>
                <Avatar
                  rounded
                  title={patient.room}
                  placeholderStyle={{
                    backgroundColor: "#499af7",
                  }}
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
              </ListItem>
              <ListItem key={patient.name + idx} bottomDivider>
                <View style={styles.valuesWithIcons}>
                  <Icon
                    name="tint"
                    type="font-awesome-5"
                    color="#cc1f2d"
                    style={styles.icon}
                  />

                  <RenderValueWithAnimation
                    patientState={patientState}
                    dataValue={patient.room}
                    sensorValue={"bloodPressure"}
                  />
                </View>
                <View style={styles.valuesWithIcons}>
                  <Icon
                    name="lungs"
                    type="font-awesome-5"
                    color="#499af7"
                    style={styles.icon}
                  />
                  <RenderValueWithAnimation
                    patientState={patientState}
                    dataValue={patient.room}
                    sensorValue={"breathingFrequency"}
                  />
                </View>
                <View style={styles.valuesWithIcons}>
                  <Icon
                    name="heartbeat"
                    type="font-awesome-5"
                    color="#cc1f2d"
                    style={styles.icon}
                  />
                  <RenderValueWithAnimation
                    patientState={patientState}
                    dataValue={patient.room}
                    sensorValue={"heartRate"}
                  />
                </View>
              </ListItem>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  valuesWithIcons: {
    paddingHorizontal: 20,
    alignItems: "baseline",
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});
