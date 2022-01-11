import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Fonts from '../constants/Fonts.js';
import Colors from '../constants/Colors.js';

const PurchaseItem = ({ purchase, itemIndex }) => {
  const [priceTextInputRef, setPriceTextInputRef] = useState(null);

  const translationXRef = useRef(new Animated.Value(0));

  const onGestureEvent = useCallback(
    Animated.event(
      [{
        nativeEvent: {
          translationX: translationXRef.current,
        },
      }],
      { useNativeDriver: true },
    ),
    [],
  );

  return (
    <Animated.View>
      <View style={styles.background}></View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={{
            ...styles.container,
            borderTopWidth: itemIndex === 0 ? 0 : 1,
            transform: [{ translateX: translationXRef.current }]
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
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
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
    borderTopColor: Colors.greyMed
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