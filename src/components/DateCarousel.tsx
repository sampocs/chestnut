import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Context from '../storage/Context';
import Actions from '../storage/Actions';
import Colors from '../constants/Colors';
import { Week } from '../storage/types';

interface DateCarouselProps {
  showBorder?: boolean;
}

const DateCarousel: React.FC<DateCarouselProps> = ({ showBorder = true }) => {
  const { state, dispatch } = useContext(Context);
  const carouselRef = useRef<Carousel<Week>>(null);
  const screenWidth = Dimensions.get('window').width;

  const renderCarouselItem = ({ item, index }: { item: Week; index: number }) => {
    const isActive = index === state.currentWeekIndex;
    
    return (
      <TouchableOpacity 
        style={[styles.itemContainer, isActive && styles.activeItem]}
        onPress={() => {
          dispatch({
            type: Actions.SET_WEEK_FROM_INDEX,
            payload: { index }
          });
          carouselRef.current?.snapToItem(index);
        }}
      >
        <Text style={[styles.dateText, isActive && styles.activeText]}>
          {item.weekStartDateFormatted}
        </Text>
      </TouchableOpacity>
    );
  };

  const onSnapToItem = (index: number) => {
    dispatch({
      type: Actions.SET_WEEK_FROM_INDEX,
      payload: { index }
    });
  };

  return (
    <View style={[styles.container, showBorder && styles.withBorder]}>
      <Carousel
        ref={carouselRef}
        data={state.weeks}
        renderItem={renderCarouselItem}
        sliderWidth={screenWidth}
        itemWidth={100}
        onSnapToItem={onSnapToItem}
        firstItem={state.currentWeekIndex}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        contentContainerCustomStyle={styles.carouselContent}
        activeSlideAlignment="center"
        enableMomentum={true}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.white,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  carouselContent: {
    paddingVertical: 10,
  },
  itemContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  activeItem: {
    backgroundColor: Colors.blueDark,
  },
  dateText: {
    fontSize: 16,
    color: Colors.greyDark,
    fontWeight: '500',
  },
  activeText: {
    color: Colors.white,
    fontWeight: '600',
  },
});

export default DateCarousel; 