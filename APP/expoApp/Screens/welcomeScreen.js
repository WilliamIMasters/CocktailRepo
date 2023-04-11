import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from '../styles';
export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>

            <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
            <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />

            <StatusBar style="auto" />
        </View>
    );
}