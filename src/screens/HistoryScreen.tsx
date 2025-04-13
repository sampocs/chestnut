import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Context from '../storage/Context';
import Colors from '../constants/Colors';

const HistoryScreen: React.FC = () => {
  const { state } = useContext(Context);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Purchase History</Text>
      </View>
      
      <FlatList
        data={state.weeks}
        keyExtractor={(item) => item.weekStartDate}
        renderItem={({ item }) => (
          <View style={styles.weekItem}>
            <Text style={styles.weekDate}>
              Week of {item.weekStartDateFormatted}
            </Text>
            <View style={styles.weekDetails}>
              <Text style={styles.budget}>
                Budget: ${state.spending[item.weekStartDate].budget}
              </Text>
              <Text style={
                state.spending[item.weekStartDate].spent > state.spending[item.weekStartDate].budget
                ? styles.overBudget
                : styles.underBudget
              }>
                Spent: ${state.spending[item.weekStartDate].spent}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.blueDark,
  },
  weekItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  weekDate: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.blueDark,
    marginBottom: 10,
  },
  weekDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budget: {
    fontSize: 16,
    color: Colors.greyDark,
  },
  overBudget: {
    fontSize: 16,
    color: Colors.redDark,
    fontWeight: 'bold',
  },
  underBudget: {
    fontSize: 16,
    color: Colors.greenDark,
  },
});

export default HistoryScreen; 