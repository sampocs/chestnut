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
import Actions from '../storage/Actions.js';

const DOUBLE_TAP_DELAY = 400;

const DowPurchases = ({ week, dow }) => {
  const { state, dispatch } = useContext(Context);
  const purchases = state[week].weeklyPurchases[dow];
  const [deleteMode, setDeleteMode] = useState(false);
  const [lastHeaderTap, setLastHeaderTap] = useState(null);

  const triggerHaptic = () => {
    const hapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false
    };
    ReactNativeHapticFeedback.trigger("impactHeavy", hapticOptions)
  }

  const onDoubleTap = () => {
    const time = new Date().getTime();
    const delta = time - lastHeaderTap;

    if (delta < DOUBLE_TAP_DELAY) {
      setDeleteMode(!deleteMode);
      setLastHeaderTap(null);
    } else {
      setLastHeaderTap(time);
    }
  }

  return (
    <Pressable
      onLongPress={() => {
        triggerHaptic();
        dispatch({
          type: Actions.ADD_ITEM,
          payload: {
            week: week,
            dow: dow
          }
        })
      }}
      onPress={onDoubleTap}
      style={styles.container}>
      <Text style={styles.dowHeadingText}>{dow}</Text>
      {purchases.map((_, itemIndex) => (
        <PurchaseItem
          week={week}
          dow={dow}
          key={itemIndex}
          itemIndex={itemIndex}
          deleteMode={deleteMode}
        />
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