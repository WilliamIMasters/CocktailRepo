import React, { useState, useTransition, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Animated } from 'react-native';
import { getAuth } from "firebase/auth";
import IngredientViewer from './IngredientViewer';

import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../styles';


const CocktailViewer = ({ navigation, cocktail }) => {

  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={[{
      backgroundColor: '#D7F1BB', borderRadius: 40, padding: 0, marginHorizontal: 10,
      marginTop: 15,
    }]}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => {
        setIsExpanded(!isExpanded);
      }}>

        <View style={styles.itemLeft}>
          <View style={styles.itemIcon}>
            <FontAwesome5 name="glass-martini-alt" size={18} color="black" />
          </View>
          <Text style={styles.itemText}>{cocktail.name ?? "Cocktail Name Missing"}</Text>
        </View>

        <Ionicons name={isExpanded ? "chevron-down" : "chevron-up"} size={18} color="black" />

      </TouchableOpacity>
      <ExpandableIngredientView expanded={isExpanded} cocktail={cocktail} navigation={navigation}>
      </ExpandableIngredientView>
    </View>



  );
}

const ExpandableIngredientView = ({ navigation, expanded = false, cocktail, Id }) => {
  const [height] = useState(new Animated.Value(0));

  const [uid, setUid] = useState("");


  const calcExpandibleSize = () => {
    var padding = 25;
    var ingredientSize = 19;
    var buttonSize = 35;

    var buttonQty = 1;

    return padding * 2 + buttonSize * buttonQty + ingredientSize * cocktail.ingredients.length;

  }

  useEffect(() => {
    setUid(getAuth().currentUser.uid);
    var size = calcExpandibleSize();

    Animated.timing(height, {
      toValue: !expanded ? size : 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <View style={styles.ingredientList}>
      <Animated.View style={{ height }}>
        <View style={styles.ingredientListInner}>
          {cocktail.userUID == getAuth().currentUser.uid &&
            <Button
              title="Edit"
              onPress={() => navigation.navigate('CocktailEdit', { CocktailId: cocktail.id })}>
            </Button>}

          {cocktail.ingredients.map((ingredient) =>
            <IngredientViewer key={ingredient.id} ingredient={ingredient} />

          )}

        </View>
      </Animated.View>
    </View>
  );
};

export default CocktailViewer;