import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  Slider,
  Switch,
  ScrollView
} from "react-native";
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
import Modal from "react-native-modal";
//TODO -fix bug that prevents you from picking the first elem in picker
export default props => (
  <EventConsumer>
    {contextProp => <EventCreationPage contextProp={contextProp} {...props} />}
  </EventConsumer>
);
//if event is repeated add copies during nsd step
const categories = [
  {
    type: "event",
    color: "#D9D85A"
  },
  {
    type: "appointment",
    color: "#816196"
  },
  {
    type: "task",
    color: "#80BD6A"
  }
];
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const repeatedDays = [false, false, false, false, false, false, false];
class EventCreationPage extends Component {
  componentDidMount() {
    this.setState({ finishedSelection: "red" });
    this.setState({ dueDate: this.props.contextProp.state.nextSevenDays[0] });
    this.findPos();
  }
  displayAMPM() {
    if (this.state.ampm) {
      return "am";
    } else {
      return "pm";
    }
  }
  state = {
    repeatedDays: [false, false, false, false, false, false, false],
    showRepeatedSelection: false,
    repeated: false,
    category: categories[0],
    title: "",
    dueDate: "",
    dueTime: "12:00",
    duration: 1,
    finishedSelection: "blue",
    qpos: -1,
    ampm: false,
    timeChoice: [
      "12:00",
      "12:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30"
    ]
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
  findLength() {
    let x = 60 * this.state.duration;
    return x;
  }
  renderDaySwitch(index) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "space-between",
          justifyContent: "space-around",
          flexDirection: "row"
        }}
      >
        <Text>{weekDays[index]}</Text>
        <Switch
          value={this.state.repeatedDays[index]}
          onValueChange={() => {
            var x = this.state.repeatedDays.slice(0);
            x[index] = !this.state.repeatedDays[index];
            return this.setState({
              repeatedDays: x
            });
          }}
        />
      </View>
    );
  }
  findStartSlot() {
    const x = parseInt(this.state.dueTime, 10);
    var z = 0;
    if (x === 12) {
      z = 0;
    } else {
      z = x * 2;
    }
    if (this.state.dueTime.substring(3, 5) === "30") {
      z += 0.5;
    }
    if (!this.state.ampm) {
      z += 24;
    }
    return z * 60;
  }
  setValue = () => {
    const { queue, selectedEvent } = this.props.contextProp.state;
    let temp = JSON.parse(JSON.stringify(queue[this.state.qpos]));
    temp.category = this.state.category;
    temp.length = this.findLength();
    temp.startSlot = this.findStartSlot();
    temp.dueTime = this.state.dueTime;
    temp.content = this.state.title;
    temp.dueDate = this.state.dueDate;
    if (this.state.repeated) {
      temp.repeatedDays = this.state.repeatedDays;
      this.props.contextProp.setRepeatedEvents(temp);
    }
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
      <ScrollView>
        <Toolbar
          buttonOne="arrow-left"
          onPressOne={() => this.props.navigation.navigate("Add")}
        />
        <Section>
          <Slider
            value={1}
            minimumuValue={1}
            maximumValue={8}
            style={{ width: 250 }}
            step={0.25}
            onSlidingComplete={value => this.setState({ duration: value })}
          />
          <Text>Duration: {this.state.duration} hrs</Text>
          <Slider
            value={1}
            minimumuValue={0}
            maximumValue={2}
            step={1}
            style={{ width: 250 }}
            onSlidingComplete={value =>
              this.setState({ category: categories[value] })
            }
          />
          <Text>Event Type is: {this.state.category.type}</Text>
          <Input
            value={this.state.title}
            onChangeText={value => this.setState({ title: value })}
          />
          <Section style={{ flexDirection: "row" }}>
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
            <Picker
              selectedValue={this.state && this.state.dueTime}
              onValueChange={value =>
                this.setState({ dueTime: this.state.timeChoice[value] })
              }
              style={{ height: 50, width: 100 }}
            >
              {this.state.timeChoice.map((item, index) => {
                return <Picker.Item label={item} value={index} key={index} />;
              })}
            </Picker>
            <Switch
              value={this.state.ampm}
              onValueChange={value => this.setState({ ampm: !this.state.ampm })}
            />
          </Section>
          <Text>
            {" "}
            {this.state.dueDate} {this.state.dueTime}
            {this.displayAMPM()}
          </Text>
        </Section>
        <Section style={{ flexDirection: "row" }}>
          <Switch
            value={this.state.repeated}
            onValueChange={value =>
              this.setState({ repeated: !this.state.repeated })
            }
          />
          <RainbowButton
            onPress={() => this.setState({ showRepeatedSelection: true })}
          />
        </Section>
        <Modal isVisible={this.state.showRepeatedSelection}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text>Select repeated days</Text>
            {this.renderDaySwitch(0)}
            {this.renderDaySwitch(1)}
            {this.renderDaySwitch(2)}
            {this.renderDaySwitch(3)}
            {this.renderDaySwitch(4)}
            {this.renderDaySwitch(5)}
            {this.renderDaySwitch(6)}
            <Text>{this.state.repeatedDays[0]}</Text>
            <RainbowButton
              onPress={() => this.setState({ showRepeatedSelection: false })}
            />
          </View>
        </Modal>
        <Section>
          <RainbowButton onPress={this.setValue} />
          <Text style={{ color: "yellow" }}>{this.state.dueTime}</Text>
        </Section>
      </ScrollView>
    );
  }
}
