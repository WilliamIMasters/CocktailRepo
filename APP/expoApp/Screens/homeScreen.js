import React, { useState, useTransition, useEffect } from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { FontAwesome5 } from "@expo/vector-icons";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import Wave from "react-wavify";
import styles from "../styles";
import NavigationButtons from "../components/NavigationButtons";


function HomeScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const userPP = user.photoURL;

  console.log("auth");
  console.log(auth);

  useEffect(() => {
  }, []);

  return (
    <View style={[styles.pageContainer]}>
      <View style={[styles.accentBg, styles.pageItemHorizontal]}>
        <View>
          <Image source={userPP} style={styles.ppImage} />
        </View>
        <View style={[styles.accentBg, styles.pageItemVertical]}>
          <Text style={[styles.secondaryText, styles.titleText]}>
            {displayName ?? email}
          </Text>
          <Text
            style={[
              styles.secondaryText,
              styles.subTitleText,
              { textDecorationLine: "line-through" },
            ]}
          >
            <FontAwesome5 name="glass-martini-alt" size={12} color="black" />{" "}
            The Redan
          </Text>
        </View>
      </View>

      <View style={[styles.waveContainer, styles.secondaryBg]}>
        {/* <Text>WWave</Text> */}
        <Wave
          style={styles.accentBg}
          fill="#F2F2F2"
          paused={false}
          options={{
            height: 10,
            amplitude: 20,
            speed: 0.15,
            points: 3,
          }}
        ></Wave>
      </View>

      <NavigationButtons navigation={navigation} />
    </View>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>User: {displayName ?? email}</Text>
    //     <Button
    //         title="Public Cocktails"
    //         onPress={() => navigation.navigate('PublicCocktails')}
    //     />
    //     <Button
    //         title="My Cocktails"
    //         onPress={() => navigation.navigate('MyCocktails')}
    //     />
    //     <Button
    //         title="Add Cocktail"
    //         onPress={() => navigation.navigate('CocktailEdit', { CocktailId: null })}
    //     />
    //     <Button
    //         title="Add Ingredient"
    //         onPress={() => navigation.navigate('AddIngredient')}
    //     />

    //     <Button
    //         title="Sign Out"
    //         onPress={() => signOut(auth)}
    //     />

    //     <Button
    //         title="Copy Auth Token"
    //         onPress={() => {
    //             Clipboard.setString(user.accessToken);
    //         }}
    //     />
    // </View>
  );
}

export default HomeScreen;
