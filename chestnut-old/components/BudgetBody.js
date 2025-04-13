import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Text,
  ScrollView
} from 'react-native';
import Colors from '../constants/Colors.js';
import DowPurchases from './DowPurchases.js';
import Context from '../storage/Context.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Returns a flatlist containing all the weekly purchases
 * @component
 */
const BudgetBody = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { state } = useContext(Context);
  const { currentWeek } = state;
  
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
      >
        {state.daysOfWeek.map((item, index) => {
          return  <DowPurchases week={currentWeek} dow={item} key={index} />
        })}
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});

export default BudgetBody;