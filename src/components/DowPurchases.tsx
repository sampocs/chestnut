import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import Context from '../storage/Context';
import Actions from '../storage/Actions';
import Colors from '../constants/Colors';
import { PurchaseItem as PurchaseItemType } from '../storage/types';
import PurchaseItem from './PurchaseItem';

interface DowPurchasesProps {
  dayOfWeek: string;
}

const DowPurchases: React.FC<DowPurchasesProps> = ({ dayOfWeek }) => {
  const { state, dispatch } = useContext(Context);
  const currentWeek = state.currentWeek;
  const items = state.spending[currentWeek].weeklyPurchases[dayOfWeek];

  const handleAddItem = () => {
    const newItem: PurchaseItemType = {
      id: uuid.v4() as string,
      name: '',
      price: 0
    };
    
    dispatch({
      type: Actions.ADD_ITEM,
      payload: {
        item: newItem,
        dayOfWeek
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddItem}
        >
          <Icon name="add" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No purchases for {dayOfWeek}</Text>
          <TouchableOpacity 
            style={styles.emptyAddButton}
            onPress={handleAddItem}
          >
            <Text style={styles.emptyAddText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PurchaseItem item={item} dayOfWeek={dayOfWeek} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.blueDark,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dayOfWeek: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blueLight,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.greyDark,
    marginBottom: 15,
  },
  emptyAddButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.blueLight,
    borderRadius: 20,
  },
  emptyAddText: {
    color: Colors.white,
    fontWeight: '500',
  },
});

export default DowPurchases; 