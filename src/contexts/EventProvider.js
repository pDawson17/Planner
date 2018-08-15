import React, { createContext, Component } from "react";
import { Async } from "react-native";

export const EventContext = createContext();
export const EventConsumer = EventContext.Consumer;

class EventProvider extends Component {
  state = {
    dailyEvents: [[], [], []],
    queue: [],
    upcomingEvents: [],
    selectedDate: "",
    currentEvent: {},
    currentDate: "",
    nextSevenDays: []
  };
  async _saveData() {
    try {
      await AsyncStorage.setItem(
        "upcomingEvents",
        JSON.stringify(this.state.upcomingEvents)
      );
      await AsyncStorage.setItem("queue", JSON.stringify(this.state.queue));
    } catch (error) {
      console.log("did not save");
    }
  }
  async _retreiveData() {
    try {
      const _upcomingEvents = await AsyncStorage.getItem("upcomingEvents");
      const _queue = await AsyncStorage.getItem("queue");
      this.setState({ upcomingEvents: _upcomingEvents, queue: _queue });
    } catch (error) {
      console.log("did not load");
    }
  }
  //use findIndex to find index of selected event
  render() {
    return (
      <EventContext.Provider
        value={{
          state: this.state,
          setDate: date => this.setState({ currentDate: date }),
          setSelectedDate: day =>
            this.setState({
              selectedDate: day.dateString
            }),
          addUpcomingEvent: obj =>
            this.setState({
              upcomingEvents: this.state.upcomingEvents.concat([obj])
            }),
          addEventToQueue: () =>
            this.setState({
              queue: this.state.queue.concat([
                {
                  key: Date(),
                  date: this.state.currentDate,
                  content: "",
                  dueTime: "",
                  note: "",
                  category: {},
                  dread: "",
                  dueDate: "",
                  length: 60,
                  startSlot: 0
                }
              ])
            }),
          setQueue: arr => this.setState({ queue: arr }),
          setCurrentEvent: obj => this.setState({ currentEvent: obj }),
          setNextSevenDays: l => this.setState({ nextSevenDays: l }),
          saveData: this._saveData(),
          retrieveData: this._retreiveData(),
          setDailyEvents: list =>
            this.setState({
              dailyEvents: list
            }),
          setNeedsUpdate: () =>
            this.setState({ needsUpdate: !this.state.needsUpdate })
        }}
      >
        {this.props.children}
      </EventContext.Provider>
    );
  }
}
//day structure from WIX:
//{
//  'year':'2018', 'month':'8',
//'day':'31','timestamp': 213908712047173,
// 'dateString':'2018-08-31'
//}
export default EventProvider;
