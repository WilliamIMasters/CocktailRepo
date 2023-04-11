import React, { useState, useTransition, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles';
import config from '../config.json';
import { GetAllPublic, GetCocktailById } from '../utils/API/CocktailApiHelper';
import CocktailViewer from '../components/CocktailViewer';
import CocktailEdit from '../components/CocktailEdit'
import EditCocktailScreen from '../Screens/editCocktailScreen';

import HomeScreen from '../Screens/homeScreen';
import PublicCocktailList from '../Screens/publicCocktailsList';
import MyCocktails from '../Screens/myCocktails';
import AddIngredientScreen from '../Screens/AddIngredientScreen';


const Stack = createNativeStackNavigator();


export default function UserStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PublicCocktails" component={PublicCocktailList} />
        <Stack.Screen name="MyCocktails" component={MyCocktails} />
        <Stack.Screen name="CocktailEdit" component={EditCocktailScreen} />
        <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// https://coolors.co/98c1d9-e0fbfc-383f51-3c4f76-d7f1bb