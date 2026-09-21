import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import Context from '../storage/Context';
import Actions from '../storage/Actions';
import DateCarousel from './DateCarousel';

const BudgetHeader: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const insets = useSafeAreaInsets();
  
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetText, setBudgetText] = useState('');
  
  const currentWeek = state.currentWeek;
  const spent = state.spending[currentWeek].spent;
  const budget = state.spending[currentWeek].budget;
  const remaining = budget - spent;
  const isOverBudget = spent > budget;

  const onBudgetPress = () => {
    setBudgetText(budget.toString());
    setIsEditingBudget(true);
  };

  const onBudgetSubmit = () => {
    const newBudget = parseInt(budgetText);
    if (!isNaN(newBudget) && newBudget > 0) {
      dispatch({
        type: Actions.UPDATE_BUDGET,
        payload: {
          budget: newBudget
        }
      });
    }
    setIsEditingBudget(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.headerContent}>
        <Text style={styles.title}>Weekly Budget</Text>
        
        {isEditingBudget ? (
          <View style={styles.budgetEditContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.budgetInput}
              value={budgetText}
              onChangeText={setBudgetText}
              keyboardType="numeric"
              autoFocus
              selectTextOnFocus
              onBlur={onBudgetSubmit}
              onSubmitEditing={onBudgetSubmit}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={onBudgetPress}>
            <View style={styles.budgetContainer}>
              <Text style={styles.budgetLabel}>Budget:</Text>
              <Text style={styles.budgetAmount}>${budget}</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.spentContainer}>
          <Text style={styles.spentLabel}>Spent:</Text>
          <Text style={styles.spentAmount}>${spent}</Text>
        </View>

        <View style={styles.remainingContainer}>
          <Text style={styles.remainingLabel}>Remaining:</Text>
          <Text style={[
            styles.remainingAmount,
            isOverBudget ? styles.overBudget : styles.underBudget
          ]}>
            ${remaining}
          </Text>
        </View>
      </View>
      
      <DateCarousel />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  headerContent: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.blueDark,
    marginBottom: 15,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 18,
    color: Colors.greyDark,
    width: 100,
  },
  budgetAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.greenDark,
  },
  budgetEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dollarSign: {
    fontSize: 18,
    color: Colors.greenDark,
    marginRight: 5,
  },
  budgetInput: {
    fontSize: 18,
    color: Colors.greenDark,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
    paddingBottom: 2,
    width: 100,
  },
  spentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spentLabel: {
    fontSize: 18,
    color: Colors.greyDark,
    width: 100,
  },
  spentAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.redDark,
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainingLabel: {
    fontSize: 18,
    color: Colors.greyDark,
    width: 100,
  },
  remainingAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  overBudget: {
    color: Colors.redDark,
  },
  underBudget: {
    color: Colors.greenDark,
  },
});

export default BudgetHeader; 