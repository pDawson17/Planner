import React, { Component } from "react";
import { View, Text } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { Input } from "../components/common";

export default props => {
  <EventConsumer>
    {contextProp => <EventDetailPage contextProp={contextProp} {...props} />}
  </EventConsumer>;
};

class EventDetailPage extends Component {
  render() {
    return (
      <View>
        <Text>AMMMAMA</Text>
        <Input />
      </View>
    );
  }
}
