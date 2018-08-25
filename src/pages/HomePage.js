import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Slider } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { CalendarList, Agenda } from "react-native-calendars";
import { IconButton, Section, Input } from "../components/common";
import Modal from "react-native-modal";
import ToDoList from "../components/ToDoList";

export default props => (
  <EventConsumer>
    {contextProp => <HomePage contextProp={contextProp} {...props} />}
  </EventConsumer>
);

class HomePage extends Component {
  componentDidMount() {
    let x = new Date();
    let y = x.toISOString();
    let date = y.substring(0, 10);
    this.props.contextProp.setDate(date);
    this.generateSevenDays();
    this.props.contextProp.retrieveData;
  }
  state = {
    showModal: false,
    showAddButton: false,
    currentItem: {},
    comment: ""
  };
  generateSevenDays() {
    let l = [];
    curr = new Date();
    fd = {
      date: curr.getDate(),
      month: curr.getMonth(),
      year: curr.getFullYear()
    };
    for (var i = 0; i < 7; i++) {
      x = new Date(fd.year, fd.month, fd.date + i);
      y = x.toISOString();
      day = y.substring(0, 10);
      l.push(day);
    }
    this.props.contextProp.setNextSevenDays(l);
  }
  findDate(y) {
    var x = new Date(y);
    var z = x.toString().substring(8, 10) + " " + x.toString().substring(0, 3);
    return z;
  }
  findItemHeight(item) {
    let x = item.length / 60;
    var y;
    if (x > 5) {
      y = 80;
    } else if (x > 3) {
      y = 60;
    } else if (x > 2) {
      y = 50;
    } else {
      y = 40;
    }
    return y;
  }
  renderDayPreview() {
    var x = new Date();
    const { dailyEvents, nextSevenDays } = this.props.contextProp.state;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#0FBCF9",
          height: 225,
          alignSelf: "stretch"
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 25,
              color: "white"
            }}
          >
            {this.findDate(nextSevenDays[1])}
          </Text>
          {dailyEvents[0].map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  marginTop: 2,
                  width: 120,
                  height: this.findItemHeight(item),
                  backgroundColor: item.category.color
                }}
                onPress={() =>
                  this.setState({ currentItem: item, showModal: true })
                }
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 10
                  }}
                  numberOfLines={2}
                >
                  {item.content}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: "white",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "white"
            }}
          >
            {this.findDate(nextSevenDays[2])}
          </Text>
          {dailyEvents[1].map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  marginTop: 2,
                  width: 120,
                  height: this.findItemHeight(item),
                  backgroundColor: item.category.color
                }}
                onPress={() =>
                  this.setState({ currentItem: item, showModal: true })
                }
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 10
                  }}
                  numberOfLines={2}
                >
                  {item.content}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 25,
              color: "white"
            }}
          >
            {this.findDate(nextSevenDays[3])}
          </Text>
          {dailyEvents[2].map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  marginTop: 2,
                  width: 120,
                  height: this.findItemHeight(item),
                  backgroundColor: item.category.color
                }}
                onPress={() =>
                  this.setState({ currentItem: item, showModal: true })
                }
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 10
                  }}
                  numberOfLines={2}
                >
                  {item.content}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  renderEventDetail() {
    return (
      <Modal
        isVisible={this.state.showModal}
        onBackButtonPress={() => this.setState({ showModal: false })}
        onBackdropPress={() => this.setState({ showModal: false })}
        transparent={true}
      >
        <View
          style={{
            marginLeft: 100,
            marginTop: 100,
            height: 400,
            width: 200,
            backgroundColor: "#1E272E",
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
                this.props.contextProp.deleteEvent(this.state.currentItem);
                this.props.contextProp.divideEvents();
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
    );
  }
  renderAddButton() {
    return (
      <Modal
        isVisible={this.state.showAddButton}
        onBackButtonPress={() => this.setState({ showAddButton: false })}
        onBackdropPress={() => this.setState({ showAddButton: false })}
        backdropOpacity={0}
        animationIn={"bounce"}
        animationOut={"bounceOutRight"}
      >
        <View
          style={{
            top: 380,
            left: 330,
            alignItems: "flex-start",
            backgroundColor: "transparent",
            marginBottom: 400
          }}
        >
          <IconButton
            iconName={"rocket"}
            onPress={this.props.contextProp.addEventToQueue(this.state.comment)}
            color={"orange"}
            size={40}
            style={{ marginBottom: 20 }}
          />
          <Input
            value={this.state.comment}
            onChangeText={value => this.setState({ comment: value })}
          />
          <Slider style={{ marginBottom: 20 }} />
        </View>
      </Modal>
    );
  }
  render() {
    const {
      selectedDate,
      upcomingEvents,
      nextSevenDays,
      threeDayPreview
    } = this.props.contextProp.state;
    const {
      setSelectedDate,
      addUpcomingEvent,
      addEventToQueue
    } = this.props.contextProp;

    return (
      <View>
        {this.renderEventDetail()}
        {this.renderAddButton()}
        <ScrollView style={{ backgroundColor: "#1E272E" }}>
          <View
            style={{
              backgroundColor: "#1E272E",
              height: 100,
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#0FBCF9", fontSize: 70, marginBottom: 10 }}>
              {Date().substring(3, 7)}
            </Text>
          </View>
          {this.renderDayPreview()}
          <ToDoList
            eventsList={upcomingEvents}
            context={this.props.contextProp}
          />
        </ScrollView>
        <IconButton
          styles={{ position: "absolute", bottom: 10, right: 10 }}
          iconName={"plus-circle"}
          color={"orange"}
          size={80}
          onPress={() => this.setState({ showAddButton: true })}
        />
      </View>
    );
  }
}
