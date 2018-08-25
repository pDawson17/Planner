import React, { Component } from "react";
import { FlatList, View, Text, ScrollView } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { IconButton, Input, Section, Background } from "../components/common";
import EventDisplay from "../components/EventDisplay";
import WeekDayDisplay from "../components/WeekDayDisplay";
import { Agenda } from "react-native-calendars";

export default props => (
  <EventConsumer>
    {contextProp => <WeekDisplayPage contextProp={contextProp} {...props} />}
  </EventConsumer>
);
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
class WeekDisplayPage extends Component {
  componentDidMount() {
    this.divideEvents();
  }
  componentDidUpdate() {
    {
      this.onForceDivide();
    }
  }
  state = {
    dailyEvents: [[], [], [], [], [], [], []]
  };
  divideEvents() {
    let x = [];
    const weekDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const {
      upcomingEvents,
      nextSevenDays,
      repeatedEvents
    } = this.props.contextProp.state;
    for (var i = 0; i < 7; i++) {
      let c = []; //container
      for (var j = 0; j < upcomingEvents.length; j++) {
        if (upcomingEvents[j].dueDate === nextSevenDays[i]) {
          c.push(upcomingEvents[j]);
        }
      }
      var cu = new Date();
      var curr = cu.toString().substring(0, 3);
      var holder;
      for (var l = 0; l < 7; l++) {
        if (curr === weekDay[l]) {
          holder = l;
        }
      }

      for (var k = 0; k < repeatedEvents.length; k++) {
        if (repeatedEvents[k].repeatedDays[(i + holder) % 7]) {
          c.push(repeatedEvents[k]);
        }
      }
      x.push(c);
    }
    this.props.contextProp.setDailyEvents(x);
    this.setState({ dailyEvents: x });
  }
  onForceDivide() {
    if (this.props.contextProp.state.forceDivide) {
      this.divideEvents();
      this.props.contextProp.divideEvents();
    }
  }
  findDate(y) {
    var x = new Date(y);
    var z = x.toString().substring(0, 3);
    return z;
  }
  render() {
    const { nextSevenDays, dailyEvents } = this.props.contextProp.state;
    return (
      <View>
        <ScrollView horizontal={true} indicatorStyle="white">
          <View style={{ flex: 1 }}>
            <WeekDayDisplay
              date={nextSevenDays[0]}
              events={dailyEvents[0]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[0]}
              events={dailyEvents[0]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[1]}
              events={dailyEvents[1]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[2]}
              events={dailyEvents[2]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[3]}
              events={dailyEvents[3]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[4]}
              events={dailyEvents[4]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[5]}
              events={dailyEvents[5]}
              context={this.props.contextProp}
            />
            <EventDisplay
              date={nextSevenDays[6]}
              events={dailyEvents[6]}
              context={this.props.contextProp}
            />
          </View>
        </ScrollView>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 60,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[1])}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 140,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[2])}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 230,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[3])}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 320,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[4])}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 410,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[5])}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 500,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[6])}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            top: 590,
            fontSize: 40
          }}
        >
          {this.findDate(nextSevenDays[0])}
        </Text>
      </View>
    );
  }
}
