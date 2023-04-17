import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles";

function NavigationButtons({ navigation }) {
  return (
    <View style={[styles.pageItemHorizontal]}>
      <View style={[styles.curvedContainer, styles.altBg]}>
        <TouchableOpacity
          style={[
            styles.curvedButton,
            styles.plainItemContainer,
            styles.accentBg,
            styles.buttonListItem,
          ]}
          onPress={() => {
            navigation.navigate("MyCocktails");
          }}
        >
          <View style={styles.itemLeft}>
            <Text style={[styles.titleText]}>My Cocktails</Text>
          </View>
          <AntDesign name="caretright" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.curvedButton,
            styles.plainItemContainer,
            styles.accentBg,
            styles.buttonListItem,
          ]}
          onPress={() => {
            navigation.navigate("PublicCocktails");
          }}
        >
          <View style={styles.itemLeft}>
            <Text style={[styles.titleText]}>Public Cocktails</Text>
          </View>
          <AntDesign name="caretright" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.curvedButton,
            styles.plainItemContainer,
            styles.accentBg,
            styles.buttonListItem,
            { textDecorationLine: "line-through" },
          ]}
          onPress={() => {
            //console.log(process.e);
          }}
        >
          <View style={styles.itemLeft}>
            <Text style={[styles.titleText]}>Bar Cocktails</Text>
          </View>
          <AntDesign name="caretright" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.curvedButton,
            styles.plainItemContainer,
            styles.accentBg,
            styles.buttonListItem,
          ]}
          onPress={() => {
            navigation.navigate('CocktailEdit', { CocktailId: null })
          }}
        >
          <View style={styles.itemLeft}>
            <Text style={[styles.titleText]}>Create New Cocktails</Text>
          </View>
          <AntDesign name="caretright" size={18} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.curvedButton,
            styles.plainItemContainer,
            styles.accentBg,
            styles.buttonListItem,
          ]}
          onPress={() => navigation.navigate('Ingredients')}
        >
          <View style={styles.itemLeft}>
            <Text style={[styles.titleText]}>Ingredients</Text>
          </View>
          <AntDesign name="caretright" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default NavigationButtons;
        //     <Button
        //         title="Add Cocktail"
        //         onPress={() => navigation.navigate('CocktailEdit', { CocktailId: null })}
        //     />
        //     <Button
        //         title="Add Ingredient"
        //         onPress={() => navigation.navigate('AddIngredient')}
        //     />