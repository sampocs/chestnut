import React, { useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import WeekSummary from './WeekSummary.js';
import Colors from '../constants/Colors.js';
import Context from '../storage/Context.js';
import {
  getCurrentWeekStartDate,
  formatDateInternal,
  formatDateDisplayed
} from '../storage/DateUtils.js';

const HistoryBody = ({ weeklyData }) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
        data={weeklyData}
        renderItem={({ item }) => (
          <WeekSummary {...item} />
        )}
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

export default HistoryBody;