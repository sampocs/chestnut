import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";
import Colors from '../constants/Colors.js';
import BudgetHeader from '../components/BudgetHeader.js';
import BudgetBody from '../components/BudgetBody.js';

const WeekScreen = () => {
  return (
    <>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <BudgetHeader />
      <BudgetBody />
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