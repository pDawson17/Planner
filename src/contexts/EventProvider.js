import React, { createContext, Component } from "react";

export const EventContext = createContext();
export const EventConsumer = EventContext.Consumer;

class EventProvider extends Component {
  state = {
    queue: [],
    upcomingEvents: [],
    selectedDate: "",
    currentEvent: {},
    currentDate: "",
    nextSevenDays: []
  };
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
                  date: this.state.currentDate,
                  content: "",
                  category: "",
                  dread: "",
                  dueDate: ""
                }
              ])
            }),
          setQueue: arr => this.setState({ queue: arr }),
          setCurrentEvent: obj => this.setState({ currentEvent: obj }),
          setNextSevenDays: l => this.setState({ nextSevenDays: l })
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
