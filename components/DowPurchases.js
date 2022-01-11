import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';
import PurchaseItem from './PurchaseItem.js';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import Context from '../storage/Context.js';
import { Actions } from '../storage/Reducer.js';

const triggerHaptic = () => {
  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };
  ReactNativeHapticFeedback.trigger("impactHeavy", hapticOptions)
}

const DowPurchases = ({ week, dow }) => {
  const { state, dispatch } = useContext(Context);
  const purchases = state[week].weeklyPurchases[dow];
  return (
    <Pressable
      onLongPress={() => {
        triggerHaptic();
        dispatch({
          type: Actions.ADD_ITEM,
          payload: {
            week: '2022-01-09',
            dow: dow
          }
        })
      }}
      style={styles.container}>
      <Text style={styles.dowHeadingText}>{dow}</Text>
      {purchases.map((purchase, itemIndex) => (
        <PurchaseItem key={itemIndex} purchase={purchase} itemIndex={itemIndex} />
      ))}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.greyMed,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 }
  },
  dowHeadingText: {
    color: Colors.blueLight,
    fontFamily: Fonts.helvetica,
    fontSize: 25,
    marginBottom: 2
  }
})

export default DowPurchases;