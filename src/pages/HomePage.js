import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { CalendarList, Agenda } from "react-native-calendars";
import { IconButton, Section } from "../components/common";
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
  renderDayPreview() {
    const { dailyEvents } = this.props.contextProp.state;
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "blue",
          height: 400,
          alignSelf: "stretch"
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          {dailyEvents[0].map(item => {
            return (
              <View
                key={item.key}
                style={{
                  alignItems: "center",
                  borderRadius: 100,
                  width: 100,
                  height: item.length / 10,
                  backgroundColor: item.category.color
                }}
              >
                <Text>{item.content}</Text>
              </View>
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
          {dailyEvents[1].map(item => {
            return (
              <View
                key={item.key}
                style={{
                  alignItems: "center",
                  borderRadius: 100,
                  width: 100,
                  height: item.length / 10,
                  backgroundColor: item.category.color
                }}
              >
                <Text>{item.content}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          {dailyEvents[2].map(item => {
            return (
              <View
                key={item.key}
                style={{
                  alignItems: "center",
                  borderRadius: 100,
                  width: 100,
                  height: item.length / 10,
                  backgroundColor: item.category.color
                }}
              >
                <Text>{item.content}</Text>
              </View>
            );
          })}
        </View>
      </View>
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
      <ScrollView>
        <View
          style={{
            backgroundColor: "black",
            height: 200,
            alignSelf: "stretch",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}>HEADER</Text>
        </View>
        {this.renderDayPreview()}
        <ToDoList eventsList={upcomingEvents} />
      </ScrollView>
    );
  }
}
