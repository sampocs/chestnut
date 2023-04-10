import React from 'react';
import {
  StatusBar, View
} from "react-native";
import BudgetBody from '../components/BudgetBody.js';
import BudgetHeader from '../components/BudgetHeader.js';
import DateCarousel from '../components/DateCarousel.js';
import HelpButton from '../components/HelpButton.js';

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
        <HelpButton />
        <DateCarousel />
        <BudgetBody />
      </View>
    </>
  )
}

export default WeekScreen;