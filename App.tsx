import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './components/Navigator/Navigator';
import Login from './screens/Login/Login';

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured")).catch((e) => console.log('AQUI ERRO',e));
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /*  useEffect(() => {
     const getUser = async () => {
       const user = await AsyncStorage.getItem('agc_user');
       if (user) {
         setIsLoggedIn(true);
         UserStore().setUser(JSON.parse(user));
       }
     }
     getUser()
 
   }, [])
  */
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
