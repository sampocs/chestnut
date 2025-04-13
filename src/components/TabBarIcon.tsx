import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

interface TabBarIconProps {
  focused: boolean;
  route: {
    name: string;
  };
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, route }) => {
  let iconName = '';

  if (route.name === 'Purchases') {
    iconName = focused ? 'cart' : 'cart-outline';
  } else if (route.name === 'History') {
    iconName = focused ? 'time' : 'time-outline';
  }

  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={26}
        color={focused ? Colors.blueDark : Colors.greyDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default TabBarIcon; 