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

function CocktailList({ navigation, getCocktailsMethod }) {
    const [cocktails, setCocktails] = useState([]);
  
    const GetCocktailsFromServer = () => {
  
        getCocktailsMethod().then(response => response.json())
        .then(json => {
          console.log("json");
          console.log(json); //console.log(fakeFetch);
          setCocktails(json);
        })
        .catch(error => {
          alert("Error fetching data from api");
          console.error(error);
          //setCocktails(fakeFetch);
        });
    }
  
    const Refresh = () => {
      console.log("Refresh");
      GetCocktailsFromServer();
    }
  
    useEffect(() => {// On run ~
  
      GetCocktailsFromServer();
  
    }, []);
  
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        Refresh();
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);
  
    return (
      <View style={styles.page}>
        {!cocktails || cocktails.length < 1 ? <ActivityIndicator size="large" style={{marginTop: "50%"}}/> :
          <View style={styles.cocktailList}>
            {cocktails.map(cocktail =>
              <CocktailViewer key={cocktail.id} cocktail={cocktail} navigation={navigation} />
            )}
          </View>
        }
  
  
        <StatusBar style="auto" />
      </View>
    );
  }

  export default CocktailList;