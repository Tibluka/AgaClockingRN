import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './components/Navigator/Navigator';
import Login from './screens/Login/Login';
import { UserStore } from './zustand/User';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('agc_user');
      if (user) {
        setIsLoggedIn(true);
        UserStore().setUser(JSON.parse(user));
      }
    }
    getUser()

  }, [])

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
