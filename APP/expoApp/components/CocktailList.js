import React, { useState, useTransition, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    TextInput,
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import config from "../config.json";
import { GetAllPublic, GetCocktailById } from "../utils/API/CocktailApiHelper";
import CocktailViewer from "../components/CocktailViewer";
import { FAB } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

function CocktailList({ navigation, getCocktailsMethod }) {
    const isFocused = useIsFocused();

    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [noCocktailsFound, setNoCocktailsFound] = useState(false);

    const updateItemsShown = () => {
      GetCocktailsFromServer();
    };

    const GenerateQuery = () => {
      var query = ""

      if(searchTerm) {
         query += "?SearchParameter=" + searchTerm;
      }

      return query;
    }

    const GetCocktailsFromServer = () => {
      var query = GenerateQuery();
        getCocktailsMethod(query)
            .then((response) => response.json())
            .then((json) => {
                //console.log(json);
                if (json.length < 1) {
                    setNoCocktailsFound(true);
                }
                setCocktails(json);
            })
            .catch((error) => {
                alert("Error fetching data from api");
                console.error(error);
                //setCocktails(fakeFetch);
            });
    };

    React.useEffect(() => {
        GetCocktailsFromServer();
    }, [navigation, isFocused]);

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.pageContainer, styles.altBg]}>
                <ScrollView>
                    {!cocktails || cocktails.length < 1 ? (
                        <LoadingEmptyIndicator
                            noCocktailsFound={noCocktailsFound}
                            cocktails={cocktails}
                        />
                    ) : (
                        <View>
                            <View name={"SearchBar"} style={[styles.searchBarContainer]} >
                                <View style={[styles.itemLeft, { flexGrow: 1 }]} >
                                    <View
                                        style={[
                                            styles.curvedButtonSmall,
                                            styles.primaryBg,
                                            styles.blackBorder,
                                            { flexGrow: 1 },
                                        ]}
                                    >
                                        <TextInput
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChangeText={setSearchTerm}
                                            onSubmitEditing={() =>
                                                updateItemsShown()
                                            }
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.curvedButtonSmall,
                                        styles.primaryBg,
                                        styles.blackBorder,
                                        { width: 45 },
                                    ]}
                                    onPress={updateItemsShown}
                                >
                                    <FontAwesome
                                        name="search"
                                        size={14}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cocktailList}>
                                {cocktails.map((cocktail) => (
                                    <CocktailViewer
                                        key={cocktail.id}
                                        cocktail={cocktail}
                                        navigation={navigation}
                                    />
                                ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>

            <View style={[styles.fabFixedView]}>
                <FAB
                    title={"+"}
                    onPress={() => {
                        navigation.navigate("CocktailEdit", {
                            CocktailId: null,
                        });
                    }}
                    style={[styles.FabButton]}
                    color="#F2F2F2"
                    titleStyle={{ color: "#000000" }}
                />
            </View>
        </View>
    );
}

function LoadingEmptyIndicator({ noCocktailsFound, cocktails }) {
    if (noCocktailsFound) {
        return <Text style={[styles.titleText]}>No Cocktails Found</Text>;
    } else {
        return <ActivityIndicator size="large" style={{ marginTop: "50%" }} />;
    }
}

export default CocktailList;
