import React, { useEffect, useReducer, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-community/async-storage";
import WeekScreen from './screens/WeekScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';
import Colors from './constants/Colors.js';
import TabBarIcon from './components/TabBarIcon.js';
import Actions from './storage/Actions.js';
import Reducer from './storage/Reducer.js';
import InitialState, { NUM_WEEKS_IN_FUTURE } from './storage/InitialState.js';
import Context from './storage/Context.js';
import {
  getCurrentWeekStartDate,
  formatDateInternal,
  getWeekDifference
} from './utils/DateUtils.js';
import SplashScreen from  "react-native-splash-screen";

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
        dispatch({
          type: Actions.SET_STATE,
          payload: {
            state: state
          }
        });

        // Update the current week
        const currentWeek = formatDateInternal(getCurrentWeekStartDate());
        dispatch({
          type: Actions.SET_WEEK_FROM_DATE,
          payload: {
            weekStartDate: currentWeek
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
    }
    SplashScreen.hide();
    loadState();
    setIsLoading(false);
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
