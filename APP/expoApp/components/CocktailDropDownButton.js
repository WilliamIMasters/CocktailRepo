import React, { useState } from "react";
import { TouchableOpacity, View, Animated, Text, Button, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import styles from "../styles";
import IngredientListViewer from "./IngredientListViewer";
import { getAuth } from "firebase/auth";
import { GlassTypesWithSrc } from "../utils/enums";


const CocktailDropDownButton = ({ navigation, cocktail }) => {

    const [expanded, setExpanded] = useState(false);

    const auth = getAuth();

    const handlePress = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={[styles.expandableButtonContainer, styles.primaryBg, { overflow: "hidden" }]} >

            <TouchableOpacity
                style={[styles.curvedButton, styles.accentBg, { maxHeight: 60 }]}
                onPress={handlePress}
            >
                <View style={[styles.plainItemContainer, { paddingHorizontal: 16, }]}>
                    <View style={[styles.itemLeft]} >
                        <View style={[styles.itemIcon, { marginTop: -9, marginLeft: -8 }]}>
                            {/* <FontAwesome5 name="glass-martini-alt" size={18} color="black" /> */}
                            <CocktailGlassIcon glassType={cocktail.glassType} style={{ maxHeight: 42, width: 42 }} />
                        </View>
                        <Text style={[styles.titleText]}>{cocktail.name ?? "Cocktail Name Missing"}</Text>
                    </View>
                    <Ionicons name={!expanded ? "chevron-down" : "chevron-up"} size={18} color="black" style={[{ marginTop: -8 }]} />
                </View>

            </TouchableOpacity>


            <Collapsible collapsed={!expanded} style={[styles.primaryBg, styles.expandableButtonContentsContainer]}>

                <Text style={[styles.subTitleText, { marginVertical: 8 }]}>{cocktail.description}</Text>

                {/* Ingrediets */}
                <IngredientListViewer ingredients={cocktail.ingredients} />

                {/* Edit Button */}
                {cocktail.userUID == auth.uid &&
                    <Button
                        title="Edit"
                        onPress={() => navigation.navigate('CocktailEdit', { CocktailId: cocktail.id })}>
                    </Button>
                }
            </Collapsible>

        </View>
    );

}

function CocktailGlassIcon({ glassType }) {

    // console.log("../" + GlassTypesWithSrc[glassType].src);

    return (
        <Image source={require("../" + GlassTypesWithSrc[glassType].src)} style={{ minHeight: 42, maxHeight: 42, width: 42 }} />
    )
}

export default CocktailDropDownButton;