import React, { useState, useTransition, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import EditCocktailScreen from '../Screens/editCocktailScreen';

import HomeScreen from '../Screens/homeScreen';
import PublicCocktailList from '../Screens/publicCocktailsList';
import MyCocktails from '../Screens/myCocktails';
import AddIngredientScreen from '../Screens/AddIngredientScreen';
import IngredientListScreen from '../Screens/IngredientsListScreen';
import ProfileEditScreen from '../Screens/ProfileEditScreen';
import HeaderOptionsButton from '../components/HeaderOptionsButton';


const Stack = createNativeStackNavigator();

export default function UserStack() {

  const [homeShowOptions, setHomeShowOptions] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"
          options={{
            headerRight: () => (<HeaderOptionsButton showOptions={homeShowOptions} setShowOptions={setHomeShowOptions} />),
          }}
        >
          {(props) => <HomeScreen navigation={props.navigation} showOptions={homeShowOptions} setShowOptions={setHomeShowOptions}/>}
        </Stack.Screen>
        <Stack.Screen name="PublicCocktails" component={PublicCocktailList} />
        <Stack.Screen name="MyCocktails" component={MyCocktails} />
        <Stack.Screen name="CocktailEdit" component={EditCocktailScreen} />
        <Stack.Screen name="Ingredients" component={IngredientListScreen} />
        <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// https://coolors.co/98c1d9-e0fbfc-383f51-3c4f76-d7f1bb