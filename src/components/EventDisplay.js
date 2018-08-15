import React from "react";
import { View, Text } from "react-native";
//TODO add stacking events
const EventDisplay = ({ date, events }) => {
  let hourView = [];
  const timeSlot = {
    "12:00": 0,
    "12:30": 1,
    "01:00": 2,
    "01:30": 3,
    "02:00": 4,
    "02:30": 5,
    "03:00": 6,
    "03:30": 7,
    "04:00": 8,
    "04:30": 9,
    "05:00": 10,
    "05:30": 11,
    "06:00": 12,
    "06:30": 13,
    "07:00": 14,
    "07:30": 15,
    "08:00": 16,
    "08:30": 17,
    "09:00": 18,
    "09:30": 19,
    "10:00": 20,
    "10:30": 21,
    "11:00": 22,
    "11:30": 23
  };
  return (
    <View
      style={{
        backgroundColor: "#4B4B34",
        height: 90,
        borderTopWidth: 1,
        borderColor: "black"
      }}
    >
      {events.map(item => {
        return (
          <View
            key={item.key}
            style={{
              alignItems: "center",
              borderRadius: 100,
              height: 30,
              marginLeft: item.startSlot,
              width: item.length,
              backgroundColor: item.category.color
            }}
          >
            <Text>{item.content}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default EventDisplay;
