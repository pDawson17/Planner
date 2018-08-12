import React, { Component } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import { EventConsumer } from "../contexts/EventProvider";
import { CalendarList, Agenda } from "react-native-calendars";
import {
  IconButton,
  Input,
  Section,
  Background,
  RainbowButton,
  Toolbar
} from "../components/common";
//TODO -fix bug that prevents you from picking the first elem in picker
export default props => (
  <EventConsumer>
    {contextProp => <EventCreationPage contextProp={contextProp} {...props} />}
  </EventConsumer>
);

class EventCreationPage extends Component {
  componentDidMount() {
    this.setState({ finishedSelection: "red" });
    this.setState({ dueDate: this.props.contextProp.state.nextSevenDays[0] });
    this.findPos();
  }
  state = {
    title: "",
    dueDate: "",
    finishedSelection: "blue",
    qpos: -1
  };
  findPos() {
    const { queue, currentEvent } = this.props.contextProp.state;
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].date === currentEvent.date) {
        break;
      }
    }
    this.setState({ qpos: i });
  }
  setValue = () => {
    console.log("SETVALUE");
    console.log("dueDate is" + this.state.dueDate);
    const { queue, selectedEvent } = this.props.contextProp.state;
    let temp = JSON.parse(JSON.stringify(queue[this.state.qpos]));
    temp.content = this.state.title;
    temp.dueDate = this.state.dueDate;
    this.props.contextProp.addUpcomingEvent(temp);
    let arr = queue.slice();
    arr.splice(this.state.qpos, 1);
    this.props.contextProp.setQueue(arr);
    this.props.navigation.navigate("Add");
  };
  render() {
    const {
      selectedDate,
      upcomingEvents,
      queue,
      currentEvent,
      nextSevenDays
    } = this.props.contextProp.state;
    const { setSelectedDate, addUpcomingEvent } = this.props.contextProp;
    return (
      <Background>
        <Toolbar
          buttonOne="arrow-left"
          onPressOne={() => this.props.navigation.navigate("Add")}
        />
        <Section>
          <Input
            value={this.state.title}
            onChangeText={value => this.setState({ title: value })}
          />
          <Picker
            selectedValue={this.state && this.state.dueDate}
            onValueChange={value =>
              this.setState({ dueDate: nextSevenDays[value] })
            }
            style={{ height: 50, width: 100 }}
          >
            {nextSevenDays.map((item, index) => {
              return <Picker.Item label={item} value={index} key={index} />;
            })}
          </Picker>
        </Section>
        <Section>
          <RainbowButton onPress={this.setValue} />
          <Text style={{ color: "yellow" }}>{this.state.dueDate}</Text>
        </Section>
      </Background>
    );
  }
}
