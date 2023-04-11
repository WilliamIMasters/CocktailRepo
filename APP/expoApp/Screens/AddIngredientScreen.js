import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFormikContext, Formik, FieldArray, Field } from "formik";
import styles from '../styles';

function AddIngredientScreen({ navigation }) {
    return (
        <View>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    Name: "",
                    Description: ""
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}>

                {(props) => (
                    <EditCocktailForm props={props} CocktailId={CocktailId} />
                )}

            </Formik>
            {/* <View Name="Ingredient" style={[styles.inputContainer, styles.inputLabel]} >
                <Text style={[styles.inputLabel, styles.inputInactive]}>Id:</Text>
                <TextInput
                    style={[styles.input, styles.inputInactive]}
                    placeholder="Id"
                    onChange={props.handleChange("Id")}
                    value={props.values.Id}h
                    editable={false}
                    placeholderTextColor={'grey'}
                />
            </View> */}

        </View>
    )
}

export default AddIngredientScreen;