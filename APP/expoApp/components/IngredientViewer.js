import React, { useState, useTransition, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Animated } from 'react-native';


import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../styles';

const IngredientViewer = ({ ingredient }) => {
    return (
        <View style={styles.ingredientViewerItem}>
            <View style={styles.itemLeft}>

                <Text style={styles.itemIcon}>{ingredient.quantity}</Text>
                <Text>{ingredient.ingredient?.name ?? "Error"}</Text>

            </View>

        </View>
    );

}

export default IngredientViewer;