import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import SignUp from './screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Authorized from './screens/Authorized';

const firebaseConfig = {
  apiKey: "AIzaSyCxYoLN4UVsepj8fSGb2a8Ulbs_VN77q6A",
  authDomain: "readium-a8f91.firebaseapp.com",
  projectId: "readium-a8f91",
  storageBucket: "readium-a8f91.appspot.com",
  messagingSenderId: "415704522254",
  appId: "1:415704522254:web:2e7101ba8581436020265f",
  measurementId: "G-7T9BY95HJR"
};

const app = initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
        console.log('User logged out successfully!');
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.code, error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Authorized">
            {props => <Authorized {...props} user={user} handleAuthentication={handleAuthentication} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp">
            {props => <SignUp {...props} email={email} setEmail={setEmail} password={password} setPassword={setPassword} isLogin={isLogin} setIsLogin={setIsLogin} handleAuthentication={handleAuthentication} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;