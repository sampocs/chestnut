import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Context from '../storage/Context';
import Colors from '../constants/Colors';

const WeekScreen: React.FC = () => {
  const { state } = useContext(Context);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Weekly Purchases</Text>
        <Text style={styles.subtitle}>
          Current Week: {state.weeks[state.currentWeekIndex].weekStartDateFormatted}
        </Text>
        <Text style={styles.budget}>
          Budget: ${state.spending[state.currentWeek].budget}
        </Text>
        <Text style={styles.spent}>
          Spent: ${state.spending[state.currentWeek].spent}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.blueDark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.greyDark,
    marginBottom: 20,
  },
  budget: {
    fontSize: 20,
    color: Colors.greenDark,
    marginBottom: 5,
  },
  spent: {
    fontSize: 20,
    color: Colors.redDark,
  },
});

export default WeekScreen; 