import React, { createContext, Component } from "react";

export const EventContext = createContext();
export const EventConsumer = EventContext.Consumer;

class EventProvider extends Component {
  state = {
    upcomingEvents: [],
    selectedDate: ""
  };

  render() {
    return (
      <EventContext.Provider
        value={{
          state: this.state,
          setSelectedDate: day =>
            this.setState({
              selectedDate: day.dateString
            }),
          addUpcomingEvent: () =>
            this.setState({
              upcomingEvents: this.state.upcomingEvents.concat([
                {
                  date: Date(),
                  content: "",
                  category: "",
                  dread: "",
                  dueDate: ""
                }
              ])
            })
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
