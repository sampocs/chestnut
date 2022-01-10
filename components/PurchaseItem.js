import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import Fonts from '../constants/Fonts.js';
import Colors from '../constants/Colors.js';

const PurchaseItem = ({ purchase, itemIndex }) => {
  const [priceTextInputRef, setPriceTextInputRef] = useState(null);
  return (
    <View
      style={{
        ...styles.container,
        borderTopWidth: itemIndex === 0 ? 0 : 1,
        borderTopColor: Colors.greyLight
      }}>
      <View style={styles.itemTextInputContainer}>
        <TextInput
          style={styles.purchaseItemText}
          value={purchase.item}
          placeholder={'Item'}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => {
        if (priceTextInputRef != null) {
          priceTextInputRef.focus()
        }
      }}>
        <View style={styles.priceTextInputContainer}>
          <TextInput
            ref={ref => setPriceTextInputRef(ref)}
            style={styles.purchaseItemText}
            value={purchase.price.toString()}
            keyboardType={'number-pad'}
            placeholder={'$'}
          />
        </View>
      </TouchableWithoutFeedback>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    padding: 5
  },
  itemTextInputContainer: {
    width: '80%',
    paddingVertical: 3
  },
  priceTextInputContainer: {
    width: '20%',
    paddingVertical: 3,
    alignItems: 'flex-end'
  },
  purchaseItemText: {
    fontFamily: Fonts.arial,
    fontSize: 20,
    color: Colors.blueDark,
  }
})

export default PurchaseItem;