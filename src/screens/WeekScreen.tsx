import React from 'react';
import { View, StyleSheet } from 'react-native';
import BudgetHeader from '../components/BudgetHeader';
import BudgetBody from '../components/BudgetBody';
import WeekSummary from '../components/WeekSummary';
import { KeyboardAvoidingView, Platform } from 'react-native';

const WeekScreen: React.FC = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <BudgetHeader />
      <WeekSummary />
      <BudgetBody />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WeekScreen; 