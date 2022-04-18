import AsyncStorage from "@react-native-community/async-storage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useReducer, useState } from 'react';
import SplashScreen from "react-native-splash-screen";
import TabBarIcon from './components/TabBarIcon.js';
import Colors from './constants/Colors.js';
import HistoryScreen from './screens/HistoryScreen.js';
import WeekScreen from './screens/WeekScreen.js';
import Actions from './storage/Actions.js';
import Context from './storage/Context.js';
import InitialState, { NUM_WEEKS_IN_FUTURE } from './storage/InitialState.js';
import Reducer from './storage/Reducer.js';
import {
  formatDateInternal, getCurrentWeekStartDate, getWeekDifference
} from './utils/DateUtils.js';

const Tab = createBottomTabNavigator();

const readStateFromStorage = async () => {
  try {
    const state = await AsyncStorage.getItem('state');
    return state ? JSON.parse(state) : InitialState;
  } catch (e) {
    console.log('Failed to fetch data from storage');
    console.log(e);
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(Reducer, InitialState);

  useEffect(() => {
    async function loadState() {
      // Pull the state from storage
      const state = await readStateFromStorage();
      if (state !== undefined) {
        // Update the current week
        const currentWeek = formatDateInternal(getCurrentWeekStartDate());
        const stateWithUpdatedWeek = Reducer(state, {
          type: Actions.SET_WEEK_FROM_DATE,
          payload: {
            weekStartDate: currentWeek
          }
        })
        // Set the state from the state persisted in storage
        dispatch({
          type: Actions.SET_STATE,
          payload: {
            state: stateWithUpdatedWeek
          }
        });

        // Adds week in future if necessary so we don't run out of weeks
        const lastWeek = state.weeks[state.weeks.length - 1].weekStartDate;
        if (getWeekDifference(currentWeek, lastWeek) < NUM_WEEKS_IN_FUTURE) {
          dispatch({
            type: Actions.ADD_WEEK,
            payload: null
          });
        }
      }
      setIsLoading(false);
      SplashScreen.hide();
    }
    loadState();
  }, [])

  useEffect(() => {
    if (state) {
      AsyncStorage.setItem('state', JSON.stringify(state));
    }
  }, [state])

  const contextValues = {
    state,
    dispatch
  }

  if (isLoading) {
    return null;
  }

  return (
    <Context.Provider value={contextValues}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Week"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: Colors.blueDark,
            tabBarInactiveTintColor: Colors.grey,
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} route={route} />
          })}
        >
          <Tab.Screen name="Purchases" component={WeekScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
