import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import fire from './components/firebase/Firebase'

import Stacknavigator from './components/navigation/Stacknavigator'
import Authnavigator from './components/navigation/Authnavigator'
import { LikeConsumer } from './components/context/LikeContext';

export default function App() {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log('User online');
        setIsAuth(true)
      }else {
        setIsAuth(false)
      }
    });
  }, [isAuth])

  return (
    <LikeConsumer>
    <NavigationContainer>
        {isAuth ? <Stacknavigator /> : <Authnavigator/> }
     </NavigationContainer>
     </LikeConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
