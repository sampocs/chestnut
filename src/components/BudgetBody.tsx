import React, { useContext } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Context from '../storage/Context';
import Colors from '../constants/Colors';
import DowPurchases from './DowPurchases';

const BudgetBody: React.FC = () => {
  const { state } = useContext(Context);
  const insets = useSafeAreaInsets();
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoiding}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 20 }
        ]}
      >
        {state.daysOfWeek.map((dayOfWeek) => (
          <DowPurchases key={dayOfWeek} dayOfWeek={dayOfWeek} />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.greyLight,
  },
  contentContainer: {
    padding: 15,
  },
});

export default BudgetBody; 