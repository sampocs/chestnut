import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';

const BudgetHeader = () => {
  const spent = 225;
  const budget = 450;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${spent}/${budget}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '30%',
    backgroundColor: Colors.blueDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.arial,
    fontSize: 55,
    fontWeight: "bold"
  }
});

export default BudgetHeader;