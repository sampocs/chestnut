import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors.js';
import KeyboardAwareFlatList from 'react-native-keyboard-aware-scroll-view';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "4",
    title: "Fourth Item",
  },
  {
    id: "5",
    title: "Fifth Item",
  },
  {
    id: "6",
    title: "Sixth Item",
  },
];

const renderItem = ({ item, onChangeText, text }) => {
  return (
    <TextInput 
    style={{backgroundColor: "red", marginBottom: 10, height: 100}}
    onChangeText={onChangeText}
    value={text}
   />
  )
}

const BudgetBody = () => {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={(item) => renderItem(item, onChangeText, text)}
        keyExtractor={(item) => item.id}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  }
});

export default BudgetBody;