import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';

const BudgetHeader = () => {
  const spent = 325;
  const budget = 450;

  const { width: screenWidth } = useWindowDimensions();
  const progressBarOuterWidth = screenWidth - 30;
  const progressBarInnerWidth = Math.min((spent / budget) * progressBarOuterWidth, progressBarOuterWidth);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${spent}/${budget}`}</Text>
      <View>
        <View style={{ ...styles.progressBarOuter, width: progressBarOuterWidth }}></View>
        <View style={{ ...styles.progressBarInner, width: progressBarInnerWidth }}></View>
      </View>
    </View>
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
    fontFamily: Fonts.arial,
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