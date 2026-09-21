import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from '../storage/Context';
import Actions from '../storage/Actions';
import Colors from '../constants/Colors';
import { PurchaseItem as PurchaseItemType } from '../storage/types';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface PurchaseItemProps {
  item: PurchaseItemType;
  dayOfWeek: string;
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item, dayOfWeek }) => {
  const { dispatch } = useContext(Context);
  const [nameValue, setNameValue] = useState<string>(item.name);
  const [priceValue, setPriceValue] = useState<string>(item.price.toString());
  const [isEditing, setIsEditing] = useState<boolean>(item.name === "" && item.price === 0);

  const handleNameChange = (text: string) => {
    setNameValue(text);
  };

  const handlePriceChange = (text: string) => {
    // Only allow numbers and decimals
    if (/^[0-9]*(\.[0-9]*)?$/.test(text) || text === '') {
      setPriceValue(text);
    }
  };

  const handleDone = () => {
    const price = parseFloat(priceValue) || 0;
    
    if (nameValue.trim() === '' && price === 0) {
      // If both fields are empty, remove the item
      dispatch({
        type: Actions.REMOVE_ITEM,
        payload: {
          itemId: item.id,
          dayOfWeek
        }
      });
    } else {
      // Otherwise update the item
      dispatch({
        type: Actions.UPDATE_ITEM,
        payload: {
          item: { ...item, name: nameValue, price },
          dayOfWeek
        }
      });
    }
    setIsEditing(false);
  };

  const handleRemove = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
    dispatch({
      type: Actions.REMOVE_ITEM,
      payload: {
        itemId: item.id,
        dayOfWeek
      }
    });
  };

  if (isEditing) {
    return (
      <View style={styles.container}>
        <View style={styles.editContainer}>
          <TextInput
            style={styles.nameInput}
            value={nameValue}
            onChangeText={handleNameChange}
            placeholder="Item name"
            placeholderTextColor={Colors.greyMed}
            autoFocus
          />
          <View style={styles.priceInputContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.priceInput}
              value={priceValue}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={Colors.greyMed}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setIsEditing(true);
      }}
      onLongPress={handleRemove}
    >
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  name: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.redDark,
  },
  editContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    marginRight: 10,
    padding: 0,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
  },
  dollarSign: {
    fontSize: 16,
    color: Colors.redDark,
    marginRight: 2,
  },
  priceInput: {
    fontSize: 16,
    color: Colors.redDark,
    width: 60,
    padding: 0,
  },
  doneButton: {
    marginLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: Colors.blueDark,
    borderRadius: 15,
  },
  doneButtonText: {
    color: Colors.white,
    fontWeight: '500',
  },
});

export default PurchaseItem; 