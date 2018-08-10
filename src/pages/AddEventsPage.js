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
  state = {
    queue: []
  };
  _renderItem = ({ item }) => {
    return (
      <QueueDisplay
        item={item}
        onPress={() => this.props.navigation.navigate("EventDetail")}
      />
    );
  };
  render() {
    const { addUpcomingEvent } = this.props.contextProp.state;
    return (
      <View>
        <FlatList
          renderItem={this._renderItem}
          data={this.state.queue}
          extraData={this.state}
          keyExtractor={item => item.date}
        />
        <IconButton
          iconName="rocket"
          size={40}
          onPress={() =>
            this.setState({
              queue: this.state.queue.concat([
                {
                  date: Date()
                }
              ])
            })
          }
        />
      </View>
    );
  }
}
