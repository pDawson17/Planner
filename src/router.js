import React from "react";
import HomePage from "./pages/HomePage";
import AddEventsPage from "./pages/AddEventsPage";
import EventCreationPage from "./pages/EventCreationPage";
import WeekDisplayPage from "./pages/WeekDisplayPage";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

const HomeNavigator = createBottomTabNavigator(
  {
    Home: HomePage,
    Add: AddEventsPage,
    WeekDisplay: WeekDisplayPage
  },
  {
    lazy: false,
    tabBarOptions: {
      tabStyle: {
        backgroundColor: "#1E272E"
      }
    }
  }
);

const MNavigator = createStackNavigator(
  {
    EventCreate: EventCreationPage
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export const MainNavigator = createSwitchNavigator(
  {
    Home: HomeNavigator,
    Misc: MNavigator
  },
  {
    initialRouteName: "Home"
  }
);
