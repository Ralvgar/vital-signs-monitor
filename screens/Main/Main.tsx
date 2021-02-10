import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

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
      {!!user && (
        <ListItem key={`Selected: ${user}`}>
          <Avatar
            rounded
            size="xlarge"
            title={user[0]}
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
          />
          <ListItem.Title>{user}</ListItem.Title>
        </ListItem>
      )}

      {patientData.map(({ name }) => {
        return (
          <ListItem key={name}>
            <Avatar
              rounded
              size="medium"
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
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
