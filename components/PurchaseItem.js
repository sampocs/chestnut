import React, { useState, useRef, useCallback, useContext } from 'react';
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


const PurchaseItem = ({ week, dow, itemIndex, deleteMode }) => {
  const { state, dispatch, keyboardAvoidingScrollRef } = useContext(Context);
  const purchase = state[week].weeklyPurchases[dow][itemIndex];

  const [priceTextInputRef, setPriceTextInputRef] = useState(null);

  const [itemName, setItemName] = useState(purchase.name);
  const [itemPrice, setItemPrice] = useState(purchase.price);

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

  const removeItem = () => {
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
                if (dow === 'Friday' || dow === 'Saturday') {
                  keyboardAvoidingScrollRef.scrollToEnd();
                }
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
    color: Colors.redDark,
    fontFamily: Fonts.avenirNext,
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