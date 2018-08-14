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

class WeekDisplayPage extends Component {
  componentDidMount() {
    this.divideEvents();
  }
  state = {
    dailyEvents: [[], [], [], [], [], [], []]
  };

  divideEvents() {
    let x = [];
    //change to DueDate later
    const { upcomingEvents, nextSevenDays } = this.props.contextProp.state;
    for (var i = 0; i < 7; i++) {
      let c = []; //container
      for (var j = 0; j < upcomingEvents.length; j++) {
        if (upcomingEvents[j].dueDate === nextSevenDays[i]) {
          c.push(upcomingEvents[j]);
        }
      }
      x.push(c);
    }
    this.setState({ dailyEvents: x });
  }
  render() {
    const { nextSevenDays } = this.props.contextProp.state;
    return (
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        <View style={{ flex: 1 }}>
          <WeekDayDisplay
            date={nextSevenDays[0]}
            events={this.state.dailyEvents[0]}
          />
          <EventDisplay
            date={nextSevenDays[0]}
            events={this.state.dailyEvents[0]}
          />
          <EventDisplay
            date={nextSevenDays[1]}
            events={this.state.dailyEvents[1]}
          />
          <EventDisplay
            date={nextSevenDays[2]}
            events={this.state.dailyEvents[2]}
          />
          <EventDisplay
            date={nextSevenDays[3]}
            events={this.state.dailyEvents[3]}
          />
          <EventDisplay
            date={nextSevenDays[4]}
            events={this.state.dailyEvents[4]}
          />
          <EventDisplay
            date={nextSevenDays[5]}
            events={this.state.dailyEvents[5]}
          />
          <EventDisplay
            date={nextSevenDays[6]}
            events={this.state.dailyEvents[6]}
          />
        </View>
      </ScrollView>
    );
  }
}
