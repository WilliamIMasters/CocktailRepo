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
                <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: 16,
                }}
                onPress={() => {setShowOptions(!showOptions); }}
                >
                    <View style={[styles.curvedContainer, styles.altBg, { maxWidth: "60%"}]}>
                        <Text style={[styles.titleText, { textAlign: "center", marginBottom: 8 }]}>Options</Text>

                        

                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55, margin: 8 }]}
                            onPress={() => { setShowOptions(!showOptions);navigation.navigate('ProfileEdit') }} >
                            <Text style={[styles.subTitleText]}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55, margin: 8 }]}
                            onPress={() => { auth.signOut(); }} >
                            <Text style={[styles.subTitleText]}>Sign Out</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.curvedButton, styles.primaryBg, { maxHeight: 55, margin: 8 }]}
                            onPress={() => { setShowOptions(!showOptions) }} >
                            <Text style={[styles.subTitleText]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </Modal>
        </View>

    )
}

export default OptionsMenu;