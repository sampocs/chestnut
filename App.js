import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeekScreen from './screens/WeekScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';
import Colors from './constants/Colors.js';
import TabBarIcon from './components/TabBarIcon.js';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Week" 
        screenOptions={({ route }) => ({ 
          headerShown: false,
          tabBarActiveTintColor: Colors.blueDark,
          tabBarInactiveTintColor: Colors.grey,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} route={route}/>
        })}
        >
        <Tab.Screen name="Week" component={WeekScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default App;
