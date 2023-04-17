import React, { useState, useTransition, useEffect } from 'react';
import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import styles from '../styles';
//import { FAB } from 'react-native-elements';
import { FAB } from '@rneui/themed';
import { GetAllIngredients } from '../utils/API/CocktailApiHelper';
import { useIsFocused } from "@react-navigation/native";
import { color } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons'; 


function IngredientListScreen({navigation})  {

    const isFocused = useIsFocused();

    const [searchTerm, setSearchTerm] = useState("");
    
    const [ingredients, setIngredients] = useState([]);
    const [sortedIngredients, setSortedIngredients] = useState([]);

    useEffect(() => {// On run ~

        GetAllIngredients().then(res => res.json())
            .then(json => {
                console.log(json);
                
                json.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                
                
                setIngredients(json);
                setSortedIngredients(json);
            }).catch(error => {
                alert("Error fetching data from api");
                console.error(error);
            });

    }, [isFocused]);


    const updateItemsShown = () => {
        var updatedItems = ingredients.filter(i => {
            return i.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSortedIngredients(updatedItems);
    }

    return (
        <View style={{flex: 1,}}>
            <ScrollView style={[styles.pageContainer, styles.altBg]} >
                <View style={[styles.curvedContainer, styles.altBg]} >
                    
                    <View style={[styles.searchBarContainer]}>
                        <View style={[styles.itemLeft, {flexGrow: 1}]} >
                            <View style={[styles.curvedButtonSmall, styles.primaryBg, styles.blackBorder, {flexGrow: 1}]}>
                                <TextInput placeholder='Search...' 
                                    value={searchTerm}
                                    onChangeText={setSearchTerm}
                                    onSubmitEditing={() => updateItemsShown()}

                                />
                            </View>
                        </View>
                        

                        <TouchableOpacity style={[styles.curvedButtonSmall, styles.primaryBg, styles.blackBorder, {width: 45}]}
                            onPress={updateItemsShown}
                        >
                            <FontAwesome name="search" size={14} color="black" />
                        </TouchableOpacity>
                    </View>
                    

                    {sortedIngredients.map((ingredient) => (
                        <View key={ingredient.id} style={[styles.curvedButtonSmall, styles.accentBg]}>
                            <Text style={[styles.subTitleText]}>{ingredient.name}</Text>

                        </View>
                    ))}

                </View>
            </ScrollView>
            <View style={[styles.fabFixedView]}>
                <FAB
                    title={"+"}
                    onPress={() => {navigation.navigate('AddIngredient')} }
                    style={[styles.FabButton]}
                    color='#F2F2F2'
                    titleStyle={{"color": "#000000"}}
                />
            </View>
        </View>

    );
}

export default IngredientListScreen;