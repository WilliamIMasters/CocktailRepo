import { defined, log } from "react-native-reanimated";
import { View } from "react-native-web";
import { useFormikContext, Formik, FieldArray, Field, ErrorMessage } from "formik";
import { getAuth } from "firebase/auth";
import { Text, Button, TextInput, CheckBox } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup';
import { GlassTypes } from '../utils/enums';
import styles from '../styles';
import { useEffect } from "react";
import { GetAllIngredients, GetCocktailById, PostCocktail, DeleteCocktailById } from '../utils/API/CocktailApiHelper';

var possibleGlassTypes = [];

var possibleIngredients = [];

const SetPossibleGlassTypes = () => {
    possibleGlassTypes = [];
    GlassTypes.forEach(function (element, i) {
        possibleGlassTypes.push({ label: element, value: i })
    });
    console.log(possibleGlassTypes);
}

function EditCocktailScreen({ route, navigation }) {

    const { CocktailId, otherParam } = route.params;

    var initialValues = {
        Id: 0,
        Name: "",
        Description: "",
        IsPublic: true,
        GlassType: 0,
        UserUID: getAuth().currentUser.uid,
        Ingredients: [],
    };

    const postCocktail = (values) => {
        console.log(values);
        PostCocktail(values).then(res => {
            if (res.ok) {
                navigation.goBack();
            }
        }).catch(error => {
            alert("Api error");
            console.log(error);
        });
    }

    

    const SignupSchema = Yup.object().shape({
        Name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        Description: Yup.string()
            .min(2, 'Too Short!')
            .max(250, 'Too Long!')
            .required('Required'),
        Ingredients: Yup.array().of(
            Yup.object().shape({
                quantity: Yup.string().required('Quantity is required'),
                ingredientId: Yup.string().test("notDefault", "Select an ingredient", val => val != -1),
            })
        ),

    });

    const GetPossibleIngredients = () => {
        GetAllIngredients().then(res => res.json()).then(json => {
            possibleIngredients = json;
        }).catch(error => {
            alert("Error Could not fetch all ingredients ");
            console.error(error);
        });
        console.log(possibleIngredients);
    }

    const GetExistingCocktail = () => {
        if (CocktailId == 0 || CocktailId == null) return null;
        GetCocktailById(CocktailId).then(response => response.json())
            .then(json => {
                console.log("GetCocktailById: Cocktail Found");
                return GetInitialValues(json);
            }).catch(error => {
                alert("Error Could not find cocktail with id " + CocktailId);
                console.error(error);
            });
    }

    const GetInitialValues = (data) => {
        console.log(data);
        var initialValues = {
            Id: 0,
            Name: "",
            Description: "",
            IsPublic: true,
            GlassType: 0,
            UserUID: getAuth().currentUser.uid,
            Ingredients: [],
        }
        return initialValues;
    }


    useEffect(() => {

        SetPossibleGlassTypes();
        GetPossibleIngredients();

        // if (CocktailId != 0 && CocktailId != null) {
        //     console.log("Getting existingCocktail");
        //     GetExistingCocktail();
        //     return 
        // }

    }, []);

    return (
        <View>
            <Formik
                enableReinitialize={true}
                initialValues={
                    initialValues
                }
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    postCocktail(values);
                }}>

                {(props) => (
                    <EditCocktailForm props={props} CocktailId={CocktailId} />
                )}

            </Formik>
        </View>
    )
}

function EditCocktailForm({ props, CocktailId }) {

    const formikProps = useFormikContext()

    const GetExistingCocktail = () => {
        if (CocktailId == 0 || CocktailId == null) return null;
        GetCocktailById(CocktailId).then(response => response.json())
            .then(json => {
                console.log("GetCocktailById: Cocktail Found");
                console.log(json);
                SetInitialValues(json);
            }).catch(error => {
                alert("Error Could not find cocktail with id " + CocktailId);
                console.error(error);
            });
    }

    const SetInitialValues = (data) => {
        formikProps.setFieldValue("Id", data.id);
        formikProps.setFieldValue("Name", data.name);
        formikProps.setFieldValue("Description", data.description);
        formikProps.setFieldValue("IsPublic", data.isPublic);
        formikProps.setFieldValue("GlassType", data.glassType);
        formikProps.setFieldValue("Ingredients", data.ingredients.map(ingredient => {
            return {
                id: ingredient.id,
                quantity: ingredient.quantity,
                cocktailId: CocktailId,
                ingredientId: ingredient.ingredientId,
            }
        }));
    }

    const DeleteCocktail = () => {
        if (!CocktailId || CocktailId == 0) return;

        DeleteCocktailById(CocktailId).then(res => {
            if (res.ok) {
                navigation.goBack();
            }
        }).catch(error => {
            alert("Api error");
            console.log(error);
        });
    }

    useEffect(() => {

        GetExistingCocktail();

    }, []);

    return (
        <View>

            <View Name="Id" style={[styles.inputContainer, styles.inputLabel]} >
                <Text style={[styles.inputLabel, styles.inputInactive]}>Id:</Text>
                <TextInput
                    style={[styles.input, styles.inputInactive]}
                    placeholder="Id"
                    onChange={props.handleChange("Id")}
                    value={props.values.Id}
                    editable={false}
                    placeholderTextColor={'grey'}
                />
            </View>

            <View Name="Name" style={[styles.inputContainer, styles.inputLabel]} >
                <Text style={[styles.inputLabel]}>Cocktail Name:</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="Martini"
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
                <Text style={[styles.inputLabel]}>Description:</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder="A Classic Martini"
                    onChange={props.handleChange("Description")}
                    value={props.values.Description}
                    placeholderTextColor={'grey'}
                    onBlur={props.handleBlur("Description")}
                />

                {props.errors.Description && props.touched.Description ? (
                    <Text style={styles.errorText} >{props.errors.Description}</Text>
                ) : null}
            </View>

            <View Name="IsPublic" style={[styles.inputContainer, styles.inputLabel, styles.plainItemContainer]} >
                <View style={styles.itemLeft}>
                    <CheckBox
                        style={[styles.checkbox]}
                        onChange={props.handleChange("IsPublic")}
                        value={props.values.IsPublic}
                    />
                    <Text style={[styles.inputLabel]}>   Is Public</Text>
                </View>

            </View>

            <View Name="GlassType" style={[styles.inputContainer, styles.inputLabel]} >
                <Text style={[styles.inputLabel]}>Glass Type:</Text>
                <Dropdown
                    style={[styles.dropdown]}
                    onChange={value => { props.setFieldValue("GlassType", value.value, true) }}
                    value={props.values.GlassType}

                    data={possibleGlassTypes}
                    labelField="label"
                    valueField="value"
                />
            </View>

            <View style={styles.inputContainer}>
                <FieldArray
                    name="Ingredients">

                    {({ insert, remove, push }) => (
                        <View>

                            <View Name="IngredientsHeader" style={[styles.inputContainer, styles.inputLabel, styles.plainItemContainer]} >
                                <Text style={[styles.inputLabel]}>Ingredients</Text>
                                <Button
                                    title=" + "
                                    onPress={() => {
                                        push({
                                            id: 0,
                                            quantity: "",
                                            cocktailId: props.values.Id,
                                            ingredientId: -1,
                                        });
                                    }}
                                />
                            </View>

                            {props.values.Ingredients.map((ingredient, i) => (
                                <View key={i}>
                                    <View style={[styles.ingredientEditItemContainer]}>
                                        <View Name="QuantityAndId" style={styles.itemLeft}>
                                            <Text style={[styles.inputLabel, styles.inputInactive]}>{i}</Text>
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder="25ml"
                                                placeholderTextColor={'grey'}
                                                onChange={props.handleChange(`Ingredients.${i}.quantity`)}
                                                value={props.values.Ingredients[i].quantity}
                                                onBlur={props.handleBlur(`Ingredients.${i}.quantity`)}
                                            />
                                        </View>
                                        <Dropdown Name="Ingredient"
                                            style={[styles.dropdown]}
                                            onChange={value => { props.setFieldValue(`Ingredients.${i}.ingredientId`, value.id, true) }}
                                            value={props.values.Ingredients[i].ingredientId}
                                            search={true}

                                            data={possibleIngredients}
                                            labelField="name"
                                            valueField="id"
                                        />
                                        <Button
                                            title=" - "
                                            onPress={() => { remove(i); }}
                                        />

                                    </View>
                                    {props.touched.Ingredients &&// props.touched.Ingredients[i].quantity &&
                                        props.errors.Ingredients && props.errors.Ingredients[i] && props.errors.Ingredients[i].quantity ? (
                                        <Text style={styles.errorText} >{props.errors.Ingredients[i].quantity}</Text>
                                    ) : null}

                                    {props.touched.Ingredients && //props.touched.Ingredients[i].ingredientId &&
                                        props.errors.Ingredients && props.errors.Ingredients[i] && props.errors.Ingredients[i].ingredientId ? (
                                        <Text style={styles.errorText} >{props.errors.Ingredients[i].ingredientId}</Text>
                                    ) : null}

                                </View>


                            ))}
                        </View>

                    )}


                </FieldArray>





            </View>

            <Button title="Submit" onPress={props.handleSubmit} />
            {CocktailId != null ?
            <Button title="Delete"
                onPress={() => { DeleteCocktail(); }}
                style={styles.danger}
                color="#CC0000" />
                : null }


            <Button title="TEST" onPress={() => { console.log(props.touched); }} />
        </View>

    );
}


export default EditCocktailScreen;