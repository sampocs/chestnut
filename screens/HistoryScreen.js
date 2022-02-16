import React, { useContext } from 'react';
import {
  View,
  StatusBar
} from "react-native";
import HistoryHeader from '../components/HistoryHeader.js';
import HistoryBody from '../components/HistoryBody.js';
import Context from '../storage/Context.js';
import {
  getCurrentWeekStartDate,
  formatDateInternal
} from '../utils/DateUtils.js';

/**
 * Screen displaying all historical spending
 * @component 
 */
const HistoryScreen = () => {
  const { state } = useContext(Context);

  /**
   * For each week moving backwards from the current week,
   * collects the weekly budget and weekly spend 
   * Also returns the average spend across all weeks in the range
   */
  const getWeeklyHistoricalData = () => {
    // Get the total budget and spend for each week in the state
    const allWeeklyData = state.weeks.map((weekObj, weekIndex) => ({
      weekInternal: weekObj.weekStartDate,
      weekFormatted: weekObj.weekStartDateFormatted,
      weekIndex: weekIndex,
      spent: parseInt(state.spending[weekObj.weekStartDate].spent),
      budget: parseInt(state.spending[weekObj.weekStartDate].budget),
    }))

    // Filter to just weeks from the current week backwards
    // Sum the total spent across those weeks to get the average spend
    const currentWeek = formatDateInternal(getCurrentWeekStartDate());
    let totalSpent = 0;
    let numWeeks = 0;
    let weeklyDataToDisplay = [];
    for (let i = 0; i < allWeeklyData.length; i++) {

      const data = allWeeklyData[i];
      const { weekInternal, spent } = data;

      // Only include weeks that are older than the current week
      // and weeks that had a spend greater than 0 
      // (since a spend of zero likely indicates they took a week off)
      if (weekInternal <= currentWeek && spent > 0) {
        totalSpent += spent;
        numWeeks += 1;
        weeklyDataToDisplay = [data, ...weeklyDataToDisplay]
      }
    }

    // Return 0 if they don't have a valid weeks worth of data (to avoid NaN)
    const weeklyAverage = (numWeeks > 0) ? Math.round(totalSpent / numWeeks) : 0;

    return { weeklyDataToDisplay, weeklyAverage }
  }

  const { weeklyDataToDisplay, weeklyAverage } = getWeeklyHistoricalData();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <HistoryHeader weeklyAverage={weeklyAverage} />
        <HistoryBody weeklyData={weeklyDataToDisplay} />
      </View>
    </>
  )
}

export default HistoryScreen;