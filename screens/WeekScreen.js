import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import Colors from '../constants/Colors.js';
import BudgetHeader from '../components/BudgetHeader.js';
import DateCarousel from '../components/DateCarousel.js';
import BudgetBody from '../components/BudgetBody.js';

const WeekScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BudgetHeader />
        </TouchableWithoutFeedback>
        <DateCarousel />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
          <BudgetBody />
        </KeyboardAvoidingView>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WeekScreen;