import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert
} from 'react-native';
import Prompt from '../components/Prompt.js';
import Context from '../storage/Context.js';
import Actions from '../storage/Actions.js';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';

const validateBudgetUpdate = (budget) => {
  try {
    const budgetParsed = parseInt(budget);
    if (budgetParsed > 0) {
      return budgetParsed;
    }
  } catch (error) {
    return undefined;
  }
}

const BudgetHeader = () => {

  const { state, dispatch } = useContext(Context);
  const { currentWeek } = state;
  const spent = state[currentWeek].spent;
  const budget = state[currentWeek].budget;
  const [promptVisible, setPromptVisible] = useState(false);

  const { width: screenWidth } = useWindowDimensions();
  const progressBarOuterWidth = screenWidth - 30;
  const progressBarInnerWidth = Math.min((spent / budget) * progressBarOuterWidth, progressBarOuterWidth);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      onLongPress={() => setPromptVisible(true)}>
      <View style={styles.container}>
        <Prompt
          visible={promptVisible}
          title="Budget"
          placeholder="$"
          onCancel={() => {
            setPromptVisible(false);
          }}
          onSubmit={text => {
            setPromptVisible(false);
            const parsedBudget = validateBudgetUpdate(text);
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
          }}
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