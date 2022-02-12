import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';
import Context from '../storage/Context.js';
import Actions from '../storage/Actions.js';
import { useNavigation } from '@react-navigation/native';

const WeekSummary = ({ weekIndex, weekFormatted, spent, budget }) => {

  const { dispatch } = useContext(Context);
  const navigation = useNavigation();

  const overSpent = parseInt(spent) - parseInt(budget);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        dispatch({
          type: Actions.SET_WEEK,
          payload: {
            index: weekIndex
          }
        });
        navigation.navigate('Week');
      }}
    >
      <View style={{
        ...styles.container,
        backgroundColor: overSpent > 0 ? Colors.redDark : Colors.greenDark
      }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={styles.weekText}>{weekFormatted}</Text>
          <Text style={styles.budgetText}>{overSpent > 0 ? '+' : ''}{overSpent}</Text>
        </View>

        <Text style={styles.budgetText}><Text style={styles.spentText}>{spent}</Text> / {budget}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    // borderColor: Colors.greyMed,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 }
  },
  weekText: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: Fonts.helvetica,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  spentText: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: Fonts.helvetica,
    fontWeight: 'bold'
  },
  budgetText: {
    color: Colors.white,
    fontSize: 25,
    fontFamily: Fonts.helvetica
  }
})

export default WeekSummary;