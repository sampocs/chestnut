import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  Vibration
} from 'react-native';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


const DATA = [
  {
    id: "1",
    title: "Sunday",
  },
  {
    id: "2",
    title: "Monday",
  },
  {
    id: "3",
    title: "Tuesday",
  },
  {
    id: "4",
    title: "Wednesday",
  },
  {
    id: "5",
    title: "Thursday",
  },
  {
    id: "6",
    title: "Friday",
  },
  {
    id: "7",
    title: "Saturday",
  },
];

const renderItem = ({ item, onChangeText, text }) => {
  return (
    <Pressable
      onLongPress={() => {
        const options = {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false
        };

        ReactNativeHapticFeedback.trigger("impactHeavy", options)
      }}
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        borderWidth: 0,
        borderColor: Colors.greyLight,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 2 }
      }}>
      <Text style={{
        color: Colors.blueLight,
        fontFamily: Fonts.arial,
        fontSize: 30
      }}>{item.title}</Text>
    </Pressable>
  )
}

const BudgetBody = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
        data={DATA}
        renderItem={(item) => renderItem(item, onChangeText, text)}
        keyExtractor={(item) => item.id} />
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