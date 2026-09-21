import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const HistoryHeader: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Purchase History</Text>
        <Text style={styles.subtitle}>
          See your past weekly spending
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight,
  },
  headerContent: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.blueDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.greyDark,
  }
});

export default HistoryHeader; 