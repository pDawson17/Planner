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
import Icon from "react-native-vector-icons/FontAwesome";

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="home" size={35} color="white" />;
        }
      }
    },
    Add: {
      screen: AddEventsPage,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="plus-circle" size={35} color="white" />;
        }
      }
    },
    WeekDisplay: {
      screen: WeekDisplayPage,
      navigationOptions: {
        tabBarIcon: () => {
          return <Icon name="columns" size={35} color="white" />;
        }
      }
    }
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
