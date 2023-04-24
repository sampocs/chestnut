import AsyncStorage from "@react-native-community/async-storage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useReducer, useState } from 'react';
import SplashScreen from "react-native-splash-screen";
import TabBarIcon from './components/TabBarIcon.js';
import Colors from './constants/Colors.js';
import { STORAGE_ONBOARDING, STORAGE_STATE } from "./constants/State.js";
import HistoryScreen from './screens/HistoryScreen.js';
import OnboardingScreen from "./screens/OnboardingScreen.js";
import WeekScreen from './screens/WeekScreen.js';
import Actions from './storage/Actions.js';
import Context from './storage/Context.js';
import InitialState, { NUM_WEEKS_IN_FUTURE } from './storage/InitialState.js';
import Reducer from './storage/Reducer.js';
import {
  formatDateInternal, getCurrentWeekStartDate, getWeekDifference
} from './utils/DateUtils.js';

const Tab = createBottomTabNavigator();
const OnboardingStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const readStateFromStorage = async () => {
  try {
    const state = await AsyncStorage.getItem(STORAGE_STATE);
    return state ? JSON.parse(state) : InitialState;
  } catch (e) {
    console.log('Failed to fetch data from storage');
    console.log(e);
  }
}

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Instruction1" component={OnboardingScreen} initialParams={{ step: 1 }} />
      <OnboardingStack.Screen name="Instruction2" component={OnboardingScreen} initialParams={{ step: 2 }} />
      <OnboardingStack.Screen name="Instruction3" component={OnboardingScreen} initialParams={{ step: 3 }} />
    </OnboardingStack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
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
  )
}

const App = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(Reducer, InitialState);

  useEffect(() => {
    async function loadState() {
      // Check whether the user has completed the onboarding instructions
      const onboardingComplete = await AsyncStorage.getItem(STORAGE_ONBOARDING);
      setIsOnboardingComplete(onboardingComplete === 'true');

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
      AsyncStorage.setItem(STORAGE_STATE, JSON.stringify(state));
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
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {!isOnboardingComplete ? (
            <AppStack.Screen name="Onboarding" component={OnboardingNavigator} />
          ) : null}
          <AppStack.Screen name="MainApp" component={TabNavigator} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
