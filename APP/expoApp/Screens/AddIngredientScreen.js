import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFormikContext, Formik, FieldArray, Field } from "formik";
import * as Yup from 'yup';
import styles from '../styles';
import { PostIngredient } from '../utils/API/CocktailApiHelper';


function AddIngredientScreen({ navigation }) {
    const ValidationSchema = Yup.object().shape({
        Name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        Description: Yup.string()
            .min(2, 'Too Short!')
            .max(250, 'Too Long!')
            .required('Required'),
    });


    return (
        <View>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    Name: "",
                    Description: ""
                }}
                validationSchema={ValidationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    PostIngredient(values).then(res => {
                        if (res.ok) {
                            navigation.goBack();
                        }
                    });
                }}>

                {(props) => (
                    <IngredientForm props={props} />
                )}

            </Formik>
        </View>
    )
}

function IngredientForm({ props }) {
    return (
        <View>
            <View Name="Name" style={[styles.inputContainer, styles.inputLabel]} >
                <Text style={[styles.inputLabel]}>Name:</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="Name"
                    onChange={props.handleChange("Name")}
                    value={props.values.Name}
                    placeholderTextColor={'grey'}
                    onBlur={props.handleBlur("Name")}
                />
                {props.errors.Name && props.touched.Name ? (
                    <Text style={styles.errorText} >{props.errors.Name}</Text>
                ) : null}
            </View>

            <View Name="Description" style={[styles.inputContainer, styles.inputLabel]} >
                <Text style={[styles.inputLabel, styles.inputInactive]}>Description:</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="Description"
                    onChange={props.handleChange("Description")}
                    value={props.values.Description}
                    placeholderTextColor={'grey'}
                    onBlur={props.handleBlur("Description")}
                />
                {props.errors.Description && props.touched.Description ? (
                    <Text style={styles.errorText} >{props.errors.Description}</Text>
                ) : null}
            </View>


            <Button title="Submit" onPress={props.handleSubmit} />

        </View>
    );
}

export default AddIngredientScreen;