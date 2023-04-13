import AsyncStorage from "@react-native-community/async-storage";
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ImageBackground, StatusBar, TouchableOpacity, View } from "react-native";
import { STORAGE_ONBOARDING } from "../constants/State.js";

/**
 * Returns the screen with onboarding instructions
 * for first time users. Explains the gesture controls
 * @component
 */
const OnboardingScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const route = useRoute();
  const step = route.params.step;

  const backgroundImages = [
    require('../assets/instructions/instructions1-budget.png'),
    require('../assets/instructions/instructions2-add.png'),
    require('../assets/instructions/instructions3-remove.png'),
  ];

  const handleNext = () => {
    if (step < backgroundImages.length) {
      navigation.navigate(`Instruction${step + 1}`);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
      AsyncStorage.setItem(STORAGE_ONBOARDING, 'true');
    }
  };

  return (
    <>
      <StatusBar barStyle='light-content' />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={backgroundImages[step - 1]}
          style={{ width: width, height: height, flex: 1 }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ width: width, height: height }} onPress={handleNext} />
          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default OnboardingScreen;