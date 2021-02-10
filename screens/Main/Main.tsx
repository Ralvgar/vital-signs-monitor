import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

export const Main = () => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={"P"}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: "stretch" }}>
            {"hola me llamo pedro"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={"P"}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: "stretch" }}>
            {"hola me llamo pedro"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={"P"}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: "stretch" }}>
            {"hola me llamo pedro"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={"P"}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: "stretch" }}>
            {"hola me llamo pedro"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem>
        <Avatar
          rounded
          size="medium"
          title={"P"}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ alignSelf: "stretch" }}>
            {"hola me llamo pedro"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
