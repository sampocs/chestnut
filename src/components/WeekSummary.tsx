import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import Context from '../storage/Context';
import Colors from '../constants/Colors';

const WeekSummary: React.FC = () => {
  const { state } = useContext(Context);
  const currentWeek = state.currentWeek;
  const spending = state.spending[currentWeek];
  
  // Calculate percentage of budget spent
  const percentSpent = Math.min(100, Math.round((spending.spent / spending.budget) * 100));
  const isOverBudget = spending.spent > spending.budget;
  
  // Get counts for each day with purchases
  const dayStats = state.daysOfWeek.map(day => {
    const purchasesForDay = spending.weeklyPurchases[day];
    return {
      day,
      count: purchasesForDay.length,
      total: purchasesForDay.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : 0), 0)
    };
  });
  
  // Sort days by total spent (descending)
  const sortedDays = [...dayStats].sort((a, b) => b.total - a.total);
  
  // Get top spending day
  const topSpendingDay = sortedDays.length > 0 ? sortedDays[0] : null;
  
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Week Summary</Text>
        
        <View style={styles.budgetStatus}>
          <Text style={styles.statusText}>
            You've spent <Text style={styles.highlightText}>{percentSpent}%</Text> of your budget
          </Text>
          
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar,
                isOverBudget ? styles.progressBarOverBudget : styles.progressBarUnderBudget,
                { width: `${percentSpent}%` }
              ]} 
            />
          </View>
        </View>
      </View>
      
      {topSpendingDay && topSpendingDay.count > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending Insights</Text>
          
          <Text style={styles.insightText}>
            <Text style={styles.highlightText}>{topSpendingDay.day}</Text> was your highest spending day
            with <Text style={styles.highlightText}>${topSpendingDay.total}</Text> spent.
          </Text>
          
          <Text style={styles.insightText}>
            You made <Text style={styles.highlightText}>
              {state.daysOfWeek.reduce((sum, day) => sum + spending.weeklyPurchases[day].length, 0)}
            </Text> purchases this week.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.blueDark,
    marginBottom: 10,
  },
  budgetStatus: {
    marginVertical: 5,
  },
  statusText: {
    fontSize: 16,
    color: Colors.greyDark,
    marginBottom: 10,
  },
  highlightText: {
    fontWeight: '600',
    color: Colors.blueDark,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: Colors.greyLight,
    borderRadius: 5,
    marginVertical: 5,
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
  insightText: {
    fontSize: 16,
    color: Colors.greyDark,
    marginBottom: 10,
  },
});

export default WeekSummary; 