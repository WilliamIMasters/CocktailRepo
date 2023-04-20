import { Text, View } from "react-native";
import styles from "../styles";
import { DataTable } from 'react-native-paper';


const IngredientListViewer = ({ingredients}) => {

    return (
        <DataTable style={[styles.container]} >

            <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title style={{flex: 1}}>Qty</DataTable.Title>
                <DataTable.Title style={{flex: 3}}>Name</DataTable.Title>
            </DataTable.Header>

            {ingredients.map((ingredient, i) => (
                <DataTable.Row key={i}>
                    <DataTable.Cell style={{flex: 1}}>{ingredient.quantity}</DataTable.Cell>
                    <DataTable.Cell style={{flex: 3}}>{ingredient.ingredient.name}</DataTable.Cell>
                </DataTable.Row>
            ))}

        </DataTable>
    );
}

export default IngredientListViewer;