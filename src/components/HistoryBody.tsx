import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Context from '../storage/Context';
import Actions from '../storage/Actions';
import Colors from '../constants/Colors';

const HistoryBody: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const insets = useSafeAreaInsets();
  
  const handleWeekPress = (weekStartDate: string) => {
    dispatch({
      type: Actions.SET_WEEK_FROM_DATE,
      payload: {
        weekStartDate
      }
    });
  };
  
  // Sort the weeks in descending order (most recent first)
  const sortedWeeks = [...state.weeks].sort((a, b) => 
    b.weekStartDate.localeCompare(a.weekStartDate)
  );
  
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ 
        paddingBottom: insets.bottom 
      }}
      data={sortedWeeks}
      keyExtractor={(item) => item.weekStartDate}
      renderItem={({ item }) => {
        const weekData = state.spending[item.weekStartDate];
        const isOverBudget = weekData.spent > weekData.budget;
        const percentSpent = Math.min(100, Math.round((weekData.spent / weekData.budget) * 100));
        
        return (
          <TouchableOpacity
            style={styles.weekItem}
            onPress={() => handleWeekPress(item.weekStartDate)}
          >
            <View style={styles.weekHeader}>
              <Text style={styles.weekDate}>
                Week of {item.weekStartDateFormatted}
              </Text>
              <Text style={[
                styles.percentSpent,
                isOverBudget ? styles.overBudget : {}
              ]}>
                {percentSpent}%
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar,
                  isOverBudget ? styles.progressBarOverBudget : styles.progressBarUnderBudget,
                  { width: `${percentSpent}%` }
                ]} 
              />
            </View>
            
            <View style={styles.budgetDetails}>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Budget:</Text>
                <Text style={styles.budgetValue}>${weekData.budget}</Text>
              </View>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Spent:</Text>
                <Text style={[
                  styles.budgetValue,
                  isOverBudget ? styles.spentOverBudget : {}
                ]}>
                  ${weekData.spent}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyLight,
  },
  weekItem: {
    marginVertical: 8,
    marginHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekDate: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.blueDark,
  },
  percentSpent: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.greenDark,
  },
  overBudget: {
    color: Colors.redDark,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: Colors.greyLight,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  progressBarUnderBudget: {
    backgroundColor: Colors.greenDark,
  },
  progressBarOverBudget: {
    backgroundColor: Colors.redDark,
  },
  budgetDetails: {
    marginTop: 5,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  budgetLabel: {
    fontSize: 16,
    color: Colors.greyDark,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blueDark,
  },
  spentOverBudget: {
    color: Colors.redDark,
  },
});

export default HistoryBody; 