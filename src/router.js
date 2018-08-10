import React from "react";
import HomePage from "./pages/HomePage";
import AddEventsPage from "./pages/AddEventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

const HomeNavigator = createBottomTabNavigator({
  Home: HomePage,
  Add: AddEventsPage
});

const MNavigator = createStackNavigator({
  EventDetail: EventDetailPage
});

export const MainNavigator = createSwitchNavigator(
  {
    Home: HomeNavigator,
    Misc: MNavigator
  },
  {
    initialRouteName: "Home"
  }
);
