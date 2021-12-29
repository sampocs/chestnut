import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors.js';

const BudgetBody = () => {
  return (
    <View style={styles.container}>
      <Text>Body</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: Colors.white,
  }
});

export default BudgetBody;