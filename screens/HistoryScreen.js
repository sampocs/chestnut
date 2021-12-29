import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";

const HistoryScreen = () => {
  return (
    <>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <Text>History</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1  
  }
})

export default HistoryScreen;