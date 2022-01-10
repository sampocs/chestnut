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
      {purchases.map((purchase, index) => (
        <View key={index} style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 10,
          marginRight: 10,
          padding: 5,
          borderTopWidth: index === 0 ? 0 : 1,
          borderTopColor: Colors.greyLight
        }}>
          <TextInput
            style={styles.purchaseItemText}
            value={purchase.item} 
            placeholder={'Item'}
            />
          <TextInput 
            style={styles.purchaseItemText} 
            value={purchase.price.toString()} 
            placeholder={'$'}
            />
        </View>
      ))}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: Colors.greyLight,
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
  },
  purchaseItemText: {
    fontFamily: Fonts.arial,
    fontSize: 20,
    color: Colors.blueDark,
  }
})

export default DowPurchases;