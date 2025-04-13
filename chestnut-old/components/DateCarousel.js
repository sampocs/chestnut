import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';
import Actions from '../storage/Actions.js';
import Context from '../storage/Context.js';

/**
 * Component that acts as the header for a given week (e.g. "Feb 6")
 * This is returned via a flatlist for each week 
 * A PureComponent is used for performance
 * @component
 */
class DateHeader extends React.PureComponent {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.item}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

/**
 * Horizontally scrollable header for each week, allowing the user
 * to see their expenses for that week
 * @component
 */
const DateCarousel = () => {

  const ref = useRef();
  const { state, dispatch } = useContext(Context);
  const [activeIndex, setActiveIndex] = useState(state.currentWeekIndex);

  // Every time the current week is updated in the state, 
  // we want to snap to that week's header
  useEffect(() => {
    snapToWeek(state.currentWeekIndex);
    setActiveIndex(state.currentWeekIndex);
  }, [state.currentWeekIndex])

  /**
   * Helper function to snap to the current active item using 
   *  a reference to the date carousel
   * @param {number} index Postition of active week in the list
   */
  const snapToWeek = (index) => {
    ref.current?.snapToItem?.(index);
  }

  /**
   * Callback when the user scrolls to a different week,
   * This updates the state and context
   * @param {number} index Postition of active week in the list
   */
  const onSnapToWeek = (index) => {
    setActiveIndex(index);
    dispatch({
      type: Actions.SET_WEEK_FROM_INDEX,
      payload: {
        index: index
      }
    })
  }

  /**
   * Wrapper for each header that's returned in the date carousel flatlist
   * @param {object} week Week in the format it should be displayed (e.g. "Feb 6")
   * @param {number} index Index of the new week to snap to
   * @component
   */
  const renderWeek = ({ week, index }) => {
    return (
      <DateHeader title={week} onPress={() => snapToWeek(index)}></DateHeader>
    )
  }

  // The width of each week header should be half the width of the screen
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth / 2;

  // The data in our carousel will be a list of week title's (e.g. "Feb 6")
  const dateHeaders = state.weeks.map(({ weekStartDateFormatted }) => (weekStartDateFormatted))

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        ref={ref}
        data={dateHeaders}
        renderItem={({ item: week, index }) => renderWeek({ week, index })}
        sliderWidth={screenWidth}
        itemWidth={itemWidth}
        firstItem={activeIndex}
        initialScrollIndex={activeIndex}
        getItemLayout={(_, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        onSnapToItem={onSnapToWeek} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.greyMed,
    borderBottomWidth: 0.5,
    paddingBottom: 5
  },
  item: {
    backgroundColor: Colors.greenDark,
    borderRadius: 10,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    marginVertical: 10
  },
  text: {
    fontFamily: Fonts.avenirNext,
    fontSize: 35,
    color: Colors.white,
    fontWeight: "bold"
  }
})

export default DateCarousel;