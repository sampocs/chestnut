import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';

/**
 * Help button component to faciliate navigation to onboarding instructions
 */
const HelpButton = () => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding')}>
        <MaterialIcon name={'help-outline'} size={20} color={Colors.white}
        />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 50,
    right: 20
  },
});

export default HelpButton;