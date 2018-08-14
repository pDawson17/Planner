import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { IconButton } from "../components/common";
import QueueDisplay from "../components/QueueDisplay";

export default props => (
  <EventConsumer>
    {contextProp => <AddEventsPage contextProp={contextProp} {...props} />}
  </EventConsumer>
);
//this.state contains queue; when queue elem is popped, edit reminder in
//context; update queue in componentDidUpdate
class AddEventsPage extends Component {
  _renderItem = ({ item }) => {
    return <QueueDisplay item={item} onPress={() => this.queueOnPress(item)} />;
  };
  queueOnPress(item) {
    this.props.contextProp.setCurrentEvent(item);
    this.props.navigation.navigate("EventCreate");
  }
  render() {
    const { queue, upcomingEvents } = this.props.contextProp.state;
    return (
      <View>
        <FlatList
          renderItem={this._renderItem}
          data={queue}
          extraData={queue}
          keyExtractor={item => item.key}
        />
        <IconButton
          iconName="rocket"
          size={40}
          onPress={this.props.contextProp.addEventToQueue}
        />
      </View>
    );
  }
}
