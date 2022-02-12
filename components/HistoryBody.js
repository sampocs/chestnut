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

const HistoryBody = () => {
  const { width: screenWidth } = useWindowDimensions();
  const { state } = useContext(Context);

  const currentWeek = formatDateInternal(getCurrentWeekStartDate());
  const weeksToDisplay = (
    state.weeks.map(
      (weekObj, weekIndex) => ({ ...weekObj, weekIndex: weekIndex })
    ).filter(
      week => week.weekStartDate <= currentWeek
    ).reverse()
  );

  const getWeekSummaryProps = ({ weekIndex, weekStartDate, weekStartDateFormatted }) => {
    return {
      weekIndex: weekIndex,
      weekFormatted: weekStartDateFormatted,
      spent: state[weekStartDate].spent,
      budget: state[weekStartDate].budget
    }
  }
  return (

    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
        data={weeksToDisplay}
        renderItem={({ item }) => (
          <WeekSummary {...getWeekSummaryProps(item)} />
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