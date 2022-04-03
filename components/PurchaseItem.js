import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Image
} from 'react-native';
import Fonts from '../constants/Fonts.js';
import Colors from '../constants/Colors.js';
import Context from '../storage/Context.js';
import Actions from '../storage/Actions.js';
import triggerHaptic from '../utils/Haptic.js';

/**
 * Component for a given expense, displaying the item name and amount spent 
 * @param {string} week Week identifier in internal format (e.g. "2022-01-01")
 * @param {string} dow Day of week identifier (e.g. "Sunday")
 * @param {number} itemIndex Index of item in list of purchases for the given day
 * @param {boolean} deleteMode Boolean to indicate if the user is in 'deleteMode'
 *    at which point, the item price will be replaced by a remove button
 * @component 
 */
const PurchaseItem = ({ week, dow, itemIndex, deleteMode }) => {
  const { state, dispatch } = useContext(Context);
  const purchase = state.spending[week].weeklyPurchases[dow][itemIndex];

  const [priceTextInputRef, setPriceTextInputRef] = useState(null);

  const [itemName, setItemName] = useState(purchase.name);
  const [itemPrice, setItemPrice] = useState(purchase.price);

  useEffect(() => {
    setItemName(purchase.name);
    setItemPrice(purchase.price)
  }, [purchase])

  /**
   * Handler for when a item is update
   * Registers the update with the global context
   */
  const updateItem = () => {
    dispatch({
      type: Actions.UPDATE_ITEM,
      payload: {
        week: week,
        dow: dow,
        itemIndex: itemIndex,
        itemName: itemName,
        itemPrice: itemPrice
      }
    })
  }

  /**
   * Handler for when an item is remove
   * Should trigger haptic feedback and then remove the item from global context
   */
  const removeItem = () => {
    triggerHaptic();
    dispatch({
      type: Actions.REMOVE_ITEM,
      payload: {
        week: week,
        dow: dow,
        itemIndex: itemIndex
      }
    })
  }

  return (
    <View
      style={{
        ...styles.container,
        borderTopWidth: itemIndex === 0 ? 0 : 1,
      }}>
      <View style={styles.itemTextInputContainer}>
        <TextInput
          style={styles.purchaseItemText}
          value={itemName}
          placeholder={'Item'}
          onChangeText={setItemName}
          onEndEditing={updateItem}
          returnKeyType={itemPrice === '' ? 'next' : 'done'}
          onSubmitEditing={() => {
            if (priceTextInputRef != null && itemPrice === '') {
              priceTextInputRef.focus()
            } 
          }}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => {
        if (priceTextInputRef != null) {
          priceTextInputRef.focus()
        }
      }}>
        <View style={styles.priceTextInputContainer}>
          {deleteMode
            ?
            <TouchableWithoutFeedback onPress={removeItem}>
              <View style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButtonText}>REMOVE</Text>
              </View>
            </TouchableWithoutFeedback>
            :
            <TextInput
              ref={ref => setPriceTextInputRef(ref)}
              style={styles.purchaseItemText}
              value={itemPrice.toString()}
              keyboardType={'number-pad'}
              placeholder={'$'}
              onChangeText={setItemPrice}
              onEndEditing={() => {
                updateItem();
              }}
              returnKeyType={'done'}
            />}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.greyLight,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden'
  },
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopColor: Colors.greyMed,
    overflow: 'hidden'
  },
  itemTextInputContainer: {
    width: '75%',
    paddingVertical: 3
  },
  deleteButtonContainer: {
    paddingTop: 2
  },
  deleteButtonText: {
    color: Colors.redLight,
    fontFamily: Fonts.arial,
    fontSize: 12
  },
  priceTextInputContainer: {
    width: '25%',
    paddingVertical: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  purchaseItemText: {
    fontFamily: Fonts.arial,
    fontSize: 20,
    color: Colors.blueDark,
  }
})

export default PurchaseItem;