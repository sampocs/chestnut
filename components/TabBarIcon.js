import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from "../constants/Colors";

/**
 * Icon used in tab bar
 * @param {object} route React navigation route
 * @param {boolean} focused Boolean indicated if the current tab is selected 
 * @component 
 */
const TabBarIcon = ({ route, focused }) => {
    let color = focused ? Colors.blueDark : Colors.greyMed;
    if (route.name === 'Purchases') {
        return <FontAwesomeIcon name={'list-ul'} size={25} color={color} />
    } else if (route.name === 'History') {
        return <MaterialIcon name={'history'} size={35} color={color} style={{marginBottom: -3}}/>
    }

    return null;
}

export default TabBarIcon;