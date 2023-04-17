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
import profilePicOptions from "../utils/ProfilePicOptions"
import styles from "../styles";
import { useState } from "react";
import { useFormikContext, Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";

function ProfileEditScreen({ navigation }) {

    //const [ppIndex, setPpIndex] = useState(-1);

    


    const ProfileEditSchema = Yup.object().shape({
        displayName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const UpdateProfile = (data) => {

        var auth = getAuth();

        updateProfile(auth.currentUser, {
            displayName: data.displayName,
            photoURL: profilePicOptions[data.ppIndex].url,
        }).then((res) => {
            navigation.goBack();
        }).catch((error) => {
            Alert(error);
        });
    }

    return (
        <View style={styles.pageContainer}>
            <Formik
                enableReinitialize={true}
                initialValues={
                    {
                        ppIndex: -1,
                        displayName: "",
                    }
                }
                validationSchema={ProfileEditSchema}
                onSubmit={(values) => {
                    UpdateProfile(values);
                }}>

                {(props) => (
                    <ProfileEditForm props={props} />
                )}

            </Formik>


        </View>
    );
}

function ProfileEditForm({ props }) {

    const formikProps = useFormikContext()

    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName;
    const userPP = user.photoURL;
    
    const SetInitialValues = () => {
        formikProps.setFieldValue("displayName", displayName);
        if (userPP) {

            var i = profilePicOptions.find(val => val.url == userPP).index;
            formikProps.setFieldValue("ppIndex", i);

        }
    }



    useEffect(() => {

        SetInitialValues();

    }, []);

    return (
        <View>
            <View style={[styles.formInputContainer, styles.altBg]}>
                <Text style={styles.titleText}>Profile Picture:</Text>
                <View style={[styles.plainItemContainer]}>
                    {profilePicOptions.slice(0, 4).map((val, i) => (
                        <TouchableOpacity key={i}
                            onPress={() => { props.setFieldValue("ppIndex", val.index, true) }}
                            style={[props.values.ppIndex == val.index ? styles.ppImageSelected : null]}
                        >
                            <Image style={[styles.ppImageOption]} source={val.url} />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={[styles.plainItemContainer]}>
                    {profilePicOptions.slice(4, 8).map((val, i) => (
                        <TouchableOpacity key={i}
                            onPress={() => { props.setFieldValue("ppIndex", val.index, true) }}
                            style={[props.values.ppIndex == val.index ? styles.ppImageSelected : null]}
                        >
                            <Image style={[styles.ppImageOption]} source={val.url} />
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
            <View style={[styles.formInputContainer, styles.altBg]}>
                <Text style={styles.inputLabel}>Display Name:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Bartender42..."
                    placeholderTextColor={"grey"}
                    onChange={props.handleChange("displayName")}
                    value={props.values.displayName}
                    onBlur={props.handleBlur("displayName")}
                />

                {props.errors.displayName && props.touched.displayName ? (
                    <Text style={styles.errorText} >{props.errors.displayName}</Text>
                ) : null}
            </View>

            <Button title="Submit" onPress={props.handleSubmit} />
        </View>
    );
}

export default ProfileEditScreen;