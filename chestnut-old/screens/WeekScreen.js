import React from 'react';
import {
  View,
  StatusBar
} from "react-native";
import BudgetHeader from '../components/BudgetHeader.js';
import DateCarousel from '../components/DateCarousel.js';
import BudgetBody from '../components/BudgetBody.js';

/**
 * Returns the screen displaying items spent for given week
 * and the spending progress relative to a weekly budget
 * @component
 */
const WeekScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <BudgetHeader />
        <DateCarousel />
        <BudgetBody />
      </View>
    </>
  )
}

export default WeekScreen;