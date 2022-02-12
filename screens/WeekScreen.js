import React from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import BudgetHeader from '../components/BudgetHeader.js';
import DateCarousel from '../components/DateCarousel.js';
import BudgetBody from '../components/BudgetBody.js';

const WeekScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <BudgetHeader />
        <DateCarousel />
        {/* <KeyboardAvoidingView style={{ flex: 1}} behavior={'padding'}> */}
          <BudgetBody />
        {/* </KeyboardAvoidingView> */}
      </View>
    </>
  )
}

export default WeekScreen;