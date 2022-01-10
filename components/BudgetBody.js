import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Text
} from 'react-native';
import Colors from '../constants/Colors.js';
import DowPurchases from './DowPurchases.js';
import Context from '../storage/Context.js';


const BudgetBody = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { state } = useContext(Context);
  const currentWeek = "2022-01-09";

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
        data={state.daysOfWeek}
        renderItem={({ item }) => (
          <DowPurchases week={currentWeek} dow={item} />
        )}
        // keyExtractor={(item) => item.dow} 
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});

export default BudgetBody;