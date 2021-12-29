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
import BudgetBody from '../components/BudgetBody.js';

const WeekScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <BudgetHeader />
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
            <BudgetBody />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WeekScreen;