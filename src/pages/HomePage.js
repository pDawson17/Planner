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
  render() {
    const { selectedDate, upcomingEvents } = this.props.contextProp.state;
    const { setSelectedDate, addUpcomingEvent } = this.props.contextProp;
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
        <Text> {upcomingEvents.length} </Text>
        <IconButton onPress={addUpcomingEvent} iconName={"rocket"} size={40} />
      </View>
    );
  }
}
