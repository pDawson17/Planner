import React from "react";
import { View, Text, FlatList } from "react-native";

const WeekDayDisplay = ({ date, events }) => {
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
  const timeDisplay = [
    "12:00am",
    "12:30am",
    "01:00am",
    "01:30am",
    "02:00am",
    "02:30am",
    "03:00am",
    "03:30am",
    "04:00am",
    "04:30am",
    "05:00am",
    "05:30am",
    "06:00am",
    "06:30am",
    "07:00am",
    "07:30am",
    "08:00am",
    "08:30am",
    "09:00am",
    "09:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "01:00pm",
    "01:30pm",
    "02:00pm",
    "02:30pm",
    "03:00pm",
    "03:30pm",
    "04:00pm",
    "04:30pm",
    "05:00pm",
    "05:30pm",
    "06:00pm",
    "06:30pm",
    "07:00pm",
    "07:30pm",
    "08:00pm",
    "08:30pm",
    "09:00pm",
    "09:30pm",
    "10:00pm",
    "10:30pm",
    "11:00pm",
    "11:30pm"
  ];
  for (var i = 0; i < 48; i++) {
    hourView.push({
      blank: true,
      content: "",
      dueDate: "",
      key: i.toString()
    });
  }
  for (var j = 0; j < events.length; j++) {
    let y = events[j].dueTime;
    let z = timeSlot[y];
    if (!events[j].ampm) {
      z += 12;
    }
    if (hourView[z].blank) {
      hourView[z] = events[j];
    }
  }
  return (
    <View style={styles.dayContainerStyle}>
      <FlatList
        renderItem={item => {
          return (
            <View style={styles.blankItemStyle}>
              <Text>{timeDisplay[item.index]}</Text>
            </View>
          );
        }}
        style={{ flex: 1 }}
        data={hourView}
        keyExtractor={item => item.key}
        horizontal={true}
        extraData={hourView}
        getItemLayout={(data, index) => ({
          length: 48,
          index,
          offset: 7 * index
        })}
      />
    </View>
  );
};

const styles = {
  dayContainerStyle: {
    backgroundColor: "orange",
    height: 40, //usually 94
    borderBottomWidth: 2,
    borderColor: "#707070"
  },
  blankItemStyle: {
    backgroundColor: "yellow",
    width: 60
  }
};

export default WeekDayDisplay;
