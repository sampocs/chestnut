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
import Context from '../storage/Context.js';
import Actions from '../storage/Actions.js';
import triggerHaptic from '../utils/Haptic.js';

// Maximum millisecond delay for a tap to be considered a double tap
const DOUBLE_TAP_DELAY = 400;

/**
 * Displays all the purchases for a given day
 * (identified by the week and day of week)
 * @param {string} week Week in internal format (e.g. "2022-01-01") 
 * @param {string} dow Day of week (e.g. "Sunday")
 * @component 
 */
const DowPurchases = ({ week, dow }) => {
  const { state, dispatch } = useContext(Context);
  const purchases = state.spending[week].weeklyPurchases[dow];
  const [deleteMode, setDeleteMode] = useState(false);
  const [lastHeaderTap, setLastHeaderTap] = useState(null);

  /**
   * Toggle whether each item has a "remove" option
   * This is enabled/disabled by double tapping the day of week
   */
  const toggleDeleteMode = () => {
    const time = new Date().getTime();
    const delta = time - lastHeaderTap;

    if (delta < DOUBLE_TAP_DELAY) {
      setDeleteMode(!deleteMode);
      setLastHeaderTap(null);
      triggerHaptic();
    } else {
      setLastHeaderTap(time);
    }
  }

  /**
   * Handler for when an item is added
   * Should trigger haptic feedback and update the global context
   */
  const addItem = () => {
    triggerHaptic();
    dispatch({
      type: Actions.ADD_ITEM,
      payload: {
        week: week,
        dow: dow
      }
    })
  }

  return (
    <Pressable
      onLongPress={addItem}
      onPress={toggleDeleteMode}
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