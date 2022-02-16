import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Text
} from 'react-native';
import Colors from '../constants/Colors.js';
import DowPurchases from './DowPurchases.js';
import Context from '../storage/Context.js';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

/**
 * Returns a flatlist containing all the weekly purchases
 * @component
 */
const BudgetBody = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { state, setKeyboardAvoidingScrollRef } = useContext(Context);
  const { currentWeek } = state;

  return (
    <View style={styles.container}>
      <KeyboardAwareFlatList
        innerRef={setKeyboardAvoidingScrollRef}
        enableResetScrollToCoords={false}
        contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
        data={state.daysOfWeek}
        renderItem={({ item }) => (
          <DowPurchases week={currentWeek} dow={item} />
        )}
      />
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