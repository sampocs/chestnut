import ReactNativeHapticFeedback from "react-native-haptic-feedback";

/**
 * Trigger haptic feedback
 * Occurs when an item is added or removed
 */
const triggerHaptic = () => {
  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };
  ReactNativeHapticFeedback.trigger("impactHeavy", hapticOptions)
}

export default triggerHaptic;