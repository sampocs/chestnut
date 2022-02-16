import React, { useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeekScreen from './screens/WeekScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';
import Colors from './constants/Colors.js';
import TabBarIcon from './components/TabBarIcon.js';
import { Reducer } from './storage/Reducer.js';
import InitialState from './storage/InitialState.js';
import Context from './storage/Context.js';

const Tab = createBottomTabNavigator();

const App = () => {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const [keyboardAvoidingScrollRef, setKeyboardAvoidingScrollRef] = useState(null);

  const contextValues = {
    state, 
    dispatch,
    keyboardAvoidingScrollRef,
    setKeyboardAvoidingScrollRef
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
