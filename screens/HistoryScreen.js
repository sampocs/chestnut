import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";
import HistoryHeader from '../components/HistoryHeader.js';
import HistoryBody from '../components/HistoryBody.js';

const HistoryScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <HistoryHeader />
        <HistoryBody />
      </View>
    </>
  )
}

export default HistoryScreen;