import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';
import Context from '../storage/Context.js';

const HistoryHeader = ({ weeklyAverage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.spentText}>${weeklyAverage}</Text>
      <Text style={styles.averageText}>Weekly Average</Text>
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
  averageText: {
    color: Colors.white,
    fontFamily: Fonts.avenirNext,
    fontSize: 20,
    marginBottom: 30
  }
});

export default HistoryHeader;