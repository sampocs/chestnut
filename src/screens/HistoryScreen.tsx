import React from 'react';
import { View, StyleSheet } from 'react-native';
import HistoryHeader from '../components/HistoryHeader';
import HistoryBody from '../components/HistoryBody';

const HistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <HistoryHeader />
      <HistoryBody />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryScreen; 