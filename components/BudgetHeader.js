import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Prompt from '../components/Prompt.js';
import Context from '../storage/Context.js';
import Actions from '../storage/Actions.js';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';

/**
 * Returns the header component on the budget screen that
 * displays the total spend for the week
 * @component
 */
const BudgetHeader = () => {

  const { state, dispatch } = useContext(Context);
  const { currentWeek } = state;
  const spent = state.spending[currentWeek].spent;
  const budget = state.spending[currentWeek].budget;
  const [updateBudgetPromptVisible, setUpdateBudgetPromptVisible] = useState(false);

  const { width: screenWidth } = useWindowDimensions();
  const progressBarOuterWidth = screenWidth - 30;
  const progressBarInnerWidth = Math.min((spent / budget) * progressBarOuterWidth, progressBarOuterWidth);

  /**
   * Validates the updated budget amount passed by the user
   * @param {string} budget Text input from user for budget update
   * @returns Returns the budget as an int if it's valid and undefined otherwise
   */
  const validateUpdatedBudgetInput = (budget) => {
    try {
      const budgetParsed = parseInt(budget);
      if (budgetParsed > 0) {
        return budgetParsed;
      }
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Handler for updating the weekly budget via a user prompt
   * @param {string} text Update budget
   */
  const onUpdateBudget = (text) => {
    // Hide the prompt on submit
    setPromptVisible(false);

    // Check if they passed a valid budget
    // If the budget isn't valid, throw an alert
    // If the budget is valid, update the state
    const parsedBudget = validateUpdatedBudgetInput(text);
    if (parsedBudget === undefined) {
      Alert.alert('Invalid Input')
    } else {
      dispatch({
        type: Actions.UPDATE_BUDGET,
        payload: {
          startWeek: currentWeek,
          budget: parsedBudget
        }
      })
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      onLongPress={() => setPromptVisible(true)}>
      <View style={styles.container}>
        <Prompt
          visible={updateBudgetPromptVisible}
          title="Budget"
          placeholder="$"
          onCancel={() => { setUpdateBudgetPromptVisible(false); }}
          onSubmit={onUpdateBudget}
        />
        <Text style={styles.text}>{`${spent}/${budget}`}</Text>
        <View>
          <View style={{ ...styles.progressBarOuter, width: progressBarOuterWidth }}></View>
          <View style={{ ...styles.progressBarInner, width: progressBarInnerWidth }}></View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greenDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.avenirNext,
    fontSize: 55,
    fontWeight: "bold",
    marginBottom: 20
  },
  progressBarOuter: {
    backgroundColor: Colors.navy,
    borderWidth: 1,
    borderColor: Colors.white,
    height: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  progressBarInner: {
    backgroundColor: Colors.white,
    height: 20,
    borderRadius: 5,
    position: 'absolute'
  }
});

export default BudgetHeader;