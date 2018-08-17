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
      for (var k = 0; k < repeatedEvents.length; k++) {
        if (repeatedEvents[k].repeatedDays[i]) {
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
  render() {
    const { nextSevenDays, dailyEvents } = this.props.contextProp.state;
    return (
      <ScrollView style={{ flex: 1 }} horizontal={true}>
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
    );
  }
}
