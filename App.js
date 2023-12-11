import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigator from './components/Navigator/Navigator';

const App = () => {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
