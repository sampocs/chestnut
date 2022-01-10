import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimentions,
  useWindowDimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Fonts from '../constants/Fonts.js';
import Colors from '../constants/Colors.js'

const _renderItem = ({ item, index }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
}

const DateCarousel = () => {
  const ref = useRef();
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth / 2;
  const [activeIndex, setActiveIndex] = useState(2);
  const items = [
    {
      title: "Dec 11",
      text: "Text 1",
    },
    {
      title: "Dec 18",
      text: "Text 2",
    },
    {
      title: "Dec 25",
      text: "Text 3",
    },
    {
      title: "Jan 1",
      text: "Text 4",
    },
    {
      title: "Jan 8",
      text: "Text 5",
    }
  ];

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        ref={ref}
        data={items}
        renderItem={_renderItem}
        sliderWidth={screenWidth}
        itemWidth={itemWidth}
        firstItem={activeIndex}
        onSnapToItem={index => setActiveIndex(index)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.greyLight,
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
    shadowOffset: {width: 0, height: 2},
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