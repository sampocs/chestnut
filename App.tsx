import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useReducer, useState } from 'react';
import TabBarIcon from './src/components/TabBarIcon';
import Colors from './src/constants/Colors';
import HistoryScreen from './src/screens/HistoryScreen';
import WeekScreen from './src/screens/WeekScreen';
import Actions from './src/storage/Actions';
import Context from './src/storage/Context';
import InitialState, { NUM_WEEKS_IN_FUTURE } from './src/storage/InitialState';
import Reducer from './src/storage/Reducer';
import {
  formatDateInternal, getCurrentWeekStartDate, getWeekDifference
} from './src/utils/DateUtils';
import { AppState } from './src/storage/types';

const Tab = createBottomTabNavigator();

const readStateFromStorage = async (): Promise<AppState | undefined> => {
  try {
    const state = await AsyncStorage.getItem('state');
    return state ? JSON.parse(state) : InitialState;
  } catch (e) {
    console.log('Failed to fetch data from storage');
    console.log(e);
    return undefined;
  }
};

export default function App() {
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
        });
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
    }
    loadState();
  }, []);

  useEffect(() => {
    if (state) {
      AsyncStorage.setItem('state', JSON.stringify(state));
    }
  }, [state]);

  const contextValues = {
    state,
    dispatch
  };

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
            tabBarInactiveTintColor: Colors.greyDark,
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} route={route} />
          })}
        >
          <Tab.Screen name="Purchases" component={WeekScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
