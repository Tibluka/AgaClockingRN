import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './components/Navigator/Navigator'
import Login from './screens/Login/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (<Navigator />) : (<Login setIsLoggedIn={setIsLoggedIn} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  }
});

export default App;
