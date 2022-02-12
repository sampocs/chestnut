import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";
import HistoryHeader from '../components/HistoryHeader.js';
import HistoryBody from '../components/HistoryBody.js';
import Context from '../storage/Context.js';
import {
  getCurrentWeekStartDate,
  formatDateInternal,
  formatDateDisplayed
} from '../storage/DateUtils.js';

const HistoryScreen = () => {
  const { state } = useContext(Context);

  const currentWeek = formatDateInternal(getCurrentWeekStartDate());

  const allWeeklyData = state.weeks.map((weekObj, weekIndex) => ({
    weekInternal: weekObj.weekStartDate,
    weekFormatted: weekObj.weekStartDateFormatted, 
    weekIndex: weekIndex,
    spent: parseInt(state[weekObj.weekStartDate].spent),
    budget: parseInt(state[weekObj.weekStartDate].budget),
  }))

  let totalSpent = 0;
  let numWeeks = 0;
  let weeklyDataToDisplay = [];
  for (let i = 0; i < allWeeklyData.length; i++) {
    const data = allWeeklyData[i];
    const { weekInternal, spent } = data;
    if (weekInternal <= currentWeek && spent > 0) {
      totalSpent += spent;
      numWeeks += 1;
      weeklyDataToDisplay = [data, ...weeklyDataToDisplay]
    }
  }
  const weeklyAverage = (numWeeks > 0) ? Math.round(totalSpent / numWeeks) : 0;

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