import React, { Component } from "react";
import { View, Text } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { CalendarList, Agenda } from "react-native-calendars";
import { IconButton } from "../components/common";

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
      console.log("Day" + day);
      l.push(day);
    }
    this.props.contextProp.setNextSevenDays(l);
  }
  render() {
    const {
      selectedDate,
      upcomingEvents,
      nextSevenDays
    } = this.props.contextProp.state;
    const {
      setSelectedDate,
      addUpcomingEvent,
      addEventToQueue
    } = this.props.contextProp;
    return (
      <View>
        <CalendarList
          minDate={Date()}
          horizontal={true}
          pastScrollRange={0}
          futureScrollRange={12}
          scrollEnabled={true}
          onDayPress={setSelectedDate}
        />
        <Text> {nextSevenDays[2]} </Text>
        <IconButton onPress={addUpcomingEvent} iconName={"rocket"} size={40} />
        <IconButton
          onPress={addEventToQueue}
          iconName={"plus-circle"}
          size={40}
        />
      </View>
    );
  }
}
