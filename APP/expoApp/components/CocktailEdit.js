import React, { useState, useTransition, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, ActivityIndicator, Platform, CheckBox } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { getAuth } from "firebase/auth";
import styles from '../styles';
import config from '../config.json';
import { GetAllPublic, GetCocktailById, PostCocktail, DeleteCocktailById, GetAllIngredients } from '../utils/API/CocktailApiHelper';
import { GlassTypes } from '../utils/enums';
import { log } from 'react-native-reanimated';


var possibleIngredients = [];

var possibleGlassTypes = [];

const CocktailEdit = ({ route, navigation }) => {

    const { CocktailId, otherParam } = route.params;

    const { control, handleSubmit, formState: { errors, isValid }, setValue, getValues, register } = useForm({
        mode: 'onBlur', defaultValues: {
            Id: 0,
            Name: "",
            Description: "",
            IsPublic: true,
            GlassType: 0,
            UserUID: getAuth().currentUser.uid,
        }
    });
    const { fields, append, remove, replace } = useFieldArray({ name: 'Ingredients', control, keyName: "uId" });

    const onSubmit = () => {

        var vals = getValues();

        var userUid = getAuth().currentUser.uid;

        var apiCocktail = {
            Id: vals.Id,
            Name: vals.Name,
            Description: vals.Description,

            IsPublic: vals.IsPublic,
            GlassType: vals.GlassType,
            UserUID: userUid,


            Ingredients: fields.map(ing => {
                return {
                    Id: ing.id,
                    Quantity: ing.quantity,
                    CocktailId: vals.Id ?? 0,
                    IngredientId: ing.ingredientId,
                }
            })
        }

        console.log(apiCocktail);
        return;
        PostCocktail(apiCocktail).then(res => {
            if (res.ok) {
                navigation.goBack();
            }
        })
            .catch(error => {
                alert("Api error");
                console.log(error);
            });
    };

    const DeletePrompt = () => {
        if (Platform.OS === 'web') {
            let confirmed = confirm("Are you sure?");
            if (confirmed) {
                Delete();
            }
        }
        // } else {
        //     Alert.alert('Alert Title', 'My Alert Msg', [
        //         {
        //           text: 'Cancel',
        //           onPress: () => console.log('Cancel Pressed'),
        //           style: 'cancel',
        //         },
        //         {text: 'OK', onPress: () => console.log('OK Pressed')},
        //       ]);
        // }
    };

    const Delete = () => {

        var id = getValues().Id;
        if (id == null || id == 0) {
            return;
        }
        DeleteCocktailById(id).then(res => {
            if (res.ok) {
                navigation.goBack();
            }
        }).catch(error => {
            alert("Api error");
            console.log(error);
        });

    }

    const updateForm = (apiCocktail) => {
        if (!apiCocktail) {
            return;
        }

        console.log("ApiCocktail:");
        console.log(apiCocktail);

        setValue('Id', apiCocktail.id);
        setValue('Name', apiCocktail.name);
        setValue('Description', apiCocktail.description);

        setValue('GlassType', apiCocktail.glassType);
        setValue('IsPublic', apiCocktail.isPublic);

        setValue('Ingredients', apiCocktail.ingredients);
    }

    const getPossibleIngredients = () => {
        GetAllIngredients().then(res => res.json()).then(json => {
            possibleIngredients = json;
        }).catch(error => {
            alert("Error Could not find cocktail with id " + CocktailId);
            console.error(error);
        });
        console.log(possibleIngredients);
    }

    const AddIngredient = () => {
        var vals = getValues();
        append({
            id: 0,
            quantity: "",
            cocktailId: vals.id,
            ingredientId: 0,
        });
    }

    useEffect(() => {// On run ~
        possibleGlassTypes = [];
        GlassTypes.forEach(function (element, i) {
            possibleGlassTypes.push({ label: element, value: i })
        });

        getPossibleIngredients();

        if (CocktailId != null) {

            GetCocktailById(CocktailId).then(response => response.json())
                .then(json => {
                    console.log("GetCocktailById: Cocktail Found");
                    updateForm(json);
                }).catch(error => {
                    alert("Error Could not find cocktail with id " + CocktailId);
                    console.error(error);
                });

        }

    }, [])

    return (
        <View>
            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, styles.inputInactive]}>Id:</Text>
                <Controller
                    name="Id"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (

                        <TextInput
                            style={[styles.input, styles.inputInactive]}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={value => onChange(value)}
                            editable={false}
                            placeholder={0}
                        />
                    )}
                    rules={{ required: true }}
                    defaultValue={0}
                />
                {/* {errors.Id && <Text>This is required.</Text>} */}
            </View>

            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel]}>Cocktail name:</Text>
                <Controller
                    name="Name"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (

                        <TextInput
                            style={[styles.input]}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={value => onChange(value)}
                            editable
                            placeholder="Martini"
                            placeholderTextColor={'grey'}
                        />
                    )}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                {errors.Name && <Text style={styles.errorText}>This is required.</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel]}>Cocktail description:</Text>
                <Controller
                    name="Description"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (

                        <TextInput
                            style={[styles.input]}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={value => onChange(value)}
                            editable
                            placeholder="A classic martini"
                            placeholderTextColor={'grey'}
                        />
                    )}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                {errors.Description && <Text style={styles.errorText}>This is required.</Text>}
            </View>

            <View style={[styles.inputContainer]}>
                <Text style={[styles.inputLabel]}>Glass Type:</Text>
                <Controller
                    name="GlassType"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Dropdown
                            style={styles.dropdown}
                            value={value}
                            data={possibleGlassTypes}
                            labelField="label"
                            valueField="value"
                            onChange={item => {
                                console.log(value);
                                console.log(item.value);
                                //value = item.value;
                                onChange(item.value);
                            }}
                        />
                    )}
                    rules={{ required: true }}
                    defaultValue={""}
                />
            </View>

            <View style={[styles.inputContainer, styles.plainItemContainer]}>
            <View style={[styles.itemLeft]}>
                <Text style={[styles.inputLabel]}>Is public:</Text>
                <Controller
                    name="IsPublic"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CheckBox
                        value={value}
                        onChange={val => onChange(val)}
                        style={styles.checkbox}
              
                            
                        />
                    )}
                    rules={{ required: true }}
                    defaultValue={""}
                />
                </View>
            </View>

            {/* Ingredients: */}
            <View style={[styles.plainItemContainer, styles.inputContainer]}>
                <View style={styles.itemLeft}>
                    <Text style={[styles.inputLabel]}>Ingredients</Text>
                </View>
                <Button title='+'
                    onPress={() => AddIngredient()} />
            </View>

            <View style={styles.inputContainer}>
                {fields.map((ingredient, i) => (
                    <View style={[styles.ingredientEditItemContainer]} key={i}>
                        <View style={styles.itemLeft}>
                            <Text style={[styles.itemIcon, styles.inputLabel, styles.inputInactive]}>{i}</Text>
                            {/* <Text style={styles.inputLabel}>{ingredient.quantity}</Text> */}

                            <TextInput
                                style={[styles.input]}
                                //value={ingredient.quantity}
                                onChangeText={(value) => { fields[i].quantity = value; }}
                                //onChangeText={(value) => { update(i, )}//fields[i].quantity = value; }}
                                placeholder="25ml"
                                placeholderTextColor={'grey'}
                                {...register(`Ingredients.${i}.quantity`)}
                            />

                            <Dropdown
                                style={styles.dropdown}
                                value={ingredient.ingredientId}
                                data={possibleIngredients}
                                labelField="name"
                                valueField="id"
                                search={true}
                                onChange={item => {
                                    console.log(ingredient.ingredientId);
                                    console.log(item.id);
                                    ingredient.ingredientId = item.id;
                                }}
                            />

                        </View>
                        <Button title='-'
                            onPress={() => remove(i)} />


                    </View>
                ))}
            </View>








            <Button title="Submit" onPress={(data) => handleSubmit(data, onSubmit())} />
            <Button title="TEST" onPress={() => console.log(getValues())} />
            <Button title="TEST" onPress={() => console.log(fields)} />

            {CocktailId != null ?
                <Button title="Delete"
                    onPress={() => { DeletePrompt(); }}
                    style={styles.danger}
                    color="#CC0000" />
                : null}
        </View>
    );
}

export default CocktailEdit;