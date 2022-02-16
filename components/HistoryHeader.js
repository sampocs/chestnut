import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';

/**
 * Displays the weekly average spend across all historical spending 
 * @param {number} weeklyAverage Weekly average spend  
 * @component 
 */
const HistoryHeader = ({ weeklyAverage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.spentText}>${weeklyAverage}</Text>
      <Text style={styles.labelText}>Weekly Average</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blueDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },
  spentText: {
    color: Colors.white,
    fontFamily: Fonts.avenirNext,
    fontSize: 55,
    fontWeight: "bold",
    marginBottom: 10
  },
  labelText: {
    color: Colors.white,
    fontFamily: Fonts.avenirNext,
    fontSize: 20,
    marginBottom: 30
  }
});

export default HistoryHeader;