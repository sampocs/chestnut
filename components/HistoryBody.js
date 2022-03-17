import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions
} from 'react-native';
import WeekSummary from './WeekSummary.js';
import Colors from '../constants/Colors.js';

/**
 * Renders a flatlist to display the amount spent across each week
 * @param {Array[object]} weeklyData List of data to be displayed,
 *    must contain the following keys:
 *      weekInternal: internally formatted week (e.g. "2022-01-01")
 *      weekFormatted: week in format to be displayed (e.g. "Jan 1")
 *      weekIndex: index of week in list of all weeks
 *      spent: amount spent for that week
 *      budget: amount budgeted for that week
 * @component 
 */
const HistoryBody = ({ weeklyData }) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {weeklyData.length === 0
        ?
        <View style={styles.noPurchasesContainer}>
          <Text style={styles.noPurchaseHeaderText}>You haven't added any purchases yet!</Text>
          <Text style={styles.noPurchaseBodyText}>Head back to the main tab to log your first expense!</Text>
        </View>
        :
        <FlatList
          contentContainerStyle={{ width: screenWidth, paddingTop: 10 }}
          data={weeklyData}
          renderItem={({ item }) => (
            <WeekSummary {...item} />
          )}
        />
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  noPurchasesContainer: {
    height: '80%',
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noPurchaseHeaderText: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 30
  },
  noPurchaseBodyText: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20
  }
});

export default HistoryBody;