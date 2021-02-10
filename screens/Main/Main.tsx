import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Card, ListItem } from "react-native-elements";

interface PatientData {
  name: string;
  value: string;
}

interface Props {
  patientData: PatientData[];
}

export const Main = ({ patientData }: Props) => {
  const [user, setUser] = useState<any>();

  return (
    <View style={styles.container}>
      {patientData.map(({ name }) => {
        return (
          <Card>
            <ListItem key={name}>
              <Avatar
                rounded
                title={name[0]}
                source={{
                  uri:
                    "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{ alignSelf: "stretch" }}
                  onPress={() => setUser(name)}
                >
                  {name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </Card>
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
});
