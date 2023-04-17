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
import { getAuth, signOut, updateProfile } from "firebase/auth";
import styles from "../styles";

function OptionsMenu({ showOptions, setShowOptions, navigation }) {

    const auth = getAuth();

    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showOptions}
                onRequestClose={() => { console.log("Close"); }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <View style={[styles.curvedContainer, styles.altBg, { width: "60%", maxHeight: "50%" }]}>
                        <Text style={[styles.titleText, { textAlign: "center", marginBottom: 8 }]}>Options</Text>

                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55 }]}
                            onPress={() => { auth.signOut(); }} >
                            <Text style={[styles.subTitleText]}>Sign Out</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55 }]}
                            onPress={() => { setShowOptions(!showOptions);navigation.navigate('ProfileEdit') }} >
                            <Text style={[styles.subTitleText]}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55 }]}
                            onPress={() => { setShowOptions(!showOptions) }} >
                            <Text style={[styles.subTitleText]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>

    )
}

export default OptionsMenu;