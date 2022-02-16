import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/Colors";

/**
 * Icon used in tab bar
 * @param {object} route React navigation route
 * @param {boolean} focused Boolean indicated if the current tab is selected 
 * @component 
 */
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