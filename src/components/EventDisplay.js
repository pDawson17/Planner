import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { RainbowButton, IconButton } from "./common";
//TODO add stacking events
// props: date, events, context
class EventDisplay extends Component {
  state = {
    showModal: false,
    currentItem: {}
  };
  deleteOnPress() {}
  render() {
    const hourView = [];
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
          backgroundColor: "#1E272E",
          height: 90,
          borderTopWidth: 1,
          borderColor: "black",
          alignItems: "center"
        }}
      >
        {this.props.events.map(item => {
          return (
            <TouchableOpacity
              onPress={value => {
                this.setState({ showModal: true, currentItem: item });
              }}
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
              <Text numberOfLines={1} style={{ textAlign: "center" }}>
                {item.content}
              </Text>
              <Text>{this.props.context.state.selectedDate}</Text>
            </TouchableOpacity>
          );
        })}
        <Modal
          isVisible={this.state.showModal}
          onBackButtonPress={() => this.setState({ showModal: false })}
          onBackdropPress={() => this.setState({ showModal: false })}
          transparent={true}
          animationType={"fade"}
        >
          <View
            style={{
              marginLeft: 100,
              marginTop: 100,
              height: 400,
              width: 200,
              backgroundColor: "#0FBCF9",
              alignItems: "center",
              justifyContent: "space-around",
              borderRadius: 80
            }}
          >
            <Text style={{ color: "white", textAlign: "center", padding: 10 }}>
              {this.state.currentItem.content}
            </Text>
            <Text style={{ color: "white", textAlign: "center" }}>
              {this.state.currentItem.dueTime}
            </Text>
            <Text style={{ color: "white", textAlign: "center" }}>
              {this.state.currentItem.repeated}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "space-between",
                justifyContent: "space-between",
                height: 40,
                width: 100
              }}
            >
              <IconButton
                color={"#3C40C6"}
                iconName={"arrow-left"}
                size={40}
                onPress={() => {
                  this.setState({ showModal: false });
                }}
              />
              <IconButton
                color={"#F53B57"}
                iconName={"trash"}
                size={35}
                onPress={() => {
                  this.props.context.deleteEvent(this.state.currentItem);
                  this.props.context.divideEvents();
                  return this.setState({
                    state: this.state,
                    showModal: false,
                    currentItem: {}
                  });
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default EventDisplay;
