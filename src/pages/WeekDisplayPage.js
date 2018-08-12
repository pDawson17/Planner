import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { IconButton, Input, Section, Background } from "../components/common";
import WeekDayDisplay from "../components/WeekDayDisplay";

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
        console.log("EVENT DUE DATE" + upcomingEvents[j].dueDate);
        console.log("Seven Days:" + nextSevenDays[i]);
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
      <View style={{ flex: 1 }}>
        <Text>{this.state.dailyEvents[0].length}</Text>
        <WeekDayDisplay
          date={nextSevenDays[0]}
          events={this.state.dailyEvents[0]}
        />
        <WeekDayDisplay
          date={nextSevenDays[1]}
          events={this.state.dailyEvents[1]}
        />
        <WeekDayDisplay
          date={nextSevenDays[2]}
          events={this.state.dailyEvents[2]}
        />
        <WeekDayDisplay
          date={nextSevenDays[3]}
          events={this.state.dailyEvents[3]}
        />
        <WeekDayDisplay
          date={nextSevenDays[4]}
          events={this.state.dailyEvents[4]}
        />
        <WeekDayDisplay
          date={nextSevenDays[5]}
          events={this.state.dailyEvents[5]}
        />
        <WeekDayDisplay
          date={nextSevenDays[6]}
          events={this.state.dailyEvents[6]}
        />
      </View>
    );
  }
}
