import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/components/Navigator/Navigator';
import { UserStore } from './src/zustand/User';

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured")).catch((e) => console.log('AQUI ERRO', e));
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user, setUser } = UserStore();
  useEffect(() => {
    const getUser = async () => {
      const user: any = await AsyncStorage.getItem('agc_user');
      if (user) {
        setUser(user);
      }
    }
    getUser();

  }, [])

  return (
    <NavigationContainer>
      {/* Passe o estado de login para o AppNavigator */}
      <AppNavigator setIsLoggedIn={setIsLoggedIn} user={user} />
      {/* Aqui você pode adicionar outros componentes, como o botão de alternar login */}
    </NavigationContainer>
  );
};

export default App;
