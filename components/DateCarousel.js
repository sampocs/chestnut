import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimentions,
  useWindowDimensions,
  TouchableWithoutFeedback,
  PureComponent
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Actions from '../storage/Actions.js';
import Fonts from '../constants/Fonts.js';
import Colors from '../constants/Colors.js'
import Context from '../storage/Context.js';

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
const _renderItem = ({ item, index, snapToItem }) => {
  return (
    <DateHeader title={item.title} onPress={() => snapToItem(index)}></DateHeader>
  )
}

const DateCarousel = () => {
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth / 2;

  const ref = useRef();
  const { state, dispatch } = useContext(Context);
  const [activeIndex, setActiveIndex] = useState(0);

  const dateHeaders = state.weeks.map(({ weekStartDateFormatted }) => ({
    title: weekStartDateFormatted
  }))

  const snapToItem = (index) => {
    ref.current?.snapToItem?.(index);
  }

  const onSnapToItem = (index) => {
    setActiveIndex(index);
    dispatch({
      type: Actions.SET_WEEK,
      payload: {
        index: index
      }
    })
  }

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        ref={ref}
        data={dateHeaders}
        renderItem={({ item, index }) => _renderItem({ item, index, snapToItem })}
        sliderWidth={screenWidth}
        itemWidth={itemWidth}
        firstItem={activeIndex}
        onSnapToItem={onSnapToItem} />
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