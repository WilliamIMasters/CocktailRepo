import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native-web';

import WelcomeScreen from '../Screens/welcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../Screens/signUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack( { navigation  } ) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}