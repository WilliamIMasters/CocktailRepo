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
    Modal,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Clipboard from "@react-native-clipboard/clipboard";
import { FontAwesome5 } from "@expo/vector-icons";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import Wave from "react-wavify";
import styles from "../styles";
import NavigationButtons from "../components/NavigationButtons";
import { SimpleLineIcons } from "@expo/vector-icons";
import OptionsMenu from "../components/OptionsMenu"
import { useIsFocused } from "@react-navigation/native";

function HomeScreen({ navigation, showOptions, setShowOptions }) {

    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const email = user.email;
    const userPP = user.photoURL;

    const isFocused = useIsFocused();

    useEffect(() => { }, [isFocused]);

    const AddCocktailAction = () => {
        navigation.navigate('CocktailEdit', { CocktailId: null });
    }

    return (
        <View style={[styles.pageContainer]}>

            <OptionsMenu showOptions={showOptions} setShowOptions={setShowOptions} navigation={navigation} /> 

            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={showOptions}
                onRequestClose={() => {console.log("Close");}}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <View style={[styles.curvedContainer, styles.altBg, { width: "60%", maxHeight: "50%"}]}>
                        <Text style={[styles.titleText, { textAlign: "center", marginBottom: 8 }]}>Options</Text>
                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55 }]}
                        onPress={() => {auth.signOut();}} >
                            <Text style={[styles.subTitleText]}>Sign Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55 }]}
                            onPress={() => { setShowOptions(!showOptions) }}
                        >
                            <Text style={[styles.subTitleText]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal> */}



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
