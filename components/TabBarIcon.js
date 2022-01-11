import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/Colors";

const TabBarIcon = ({ route, focused }) => {
    let iconName;
    let color = focused ? Colors.blueDark : Colors.greyMed;
    if (route.name === 'Week') {
        iconName = 'list-ul'

    } else if (route.name === 'History') {
        iconName = 'calendar'
    }

    return <Icon name={iconName} size={25} color={color} />
}

export default TabBarIcon;