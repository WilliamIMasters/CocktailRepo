
import { StyleSheet } from 'react-native';

var primary = '#F2F2F2';
var secondary = '#000000';
var accent = '#ACE1AF';
var alt = '#D0DCD1';
var altAccent = '#69C96E';

// https://coolors.co/ace1af-f5f5f5-000000-d16014

const styles = StyleSheet.create({
    // GeneralLayout
    pageContainer: {
        flex: 1,
        flexDirection: "column",
    },
    pageItemHorizontal: {
        padding: 25,
        flexDirection: "row",
    },
    pageItemVertical: {
        padding: 25,
        flexDirection: "column",
    },
    curvedContainer: {
        padding: 18,
        borderRadius: 20,
        //flex: 1,
        width: "100%"
    },
    curvedButton: {
        padding: 18,
        borderRadius: 40,
        flex: 1,
    },
    curvedButtonSmall: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 8,
    },

    
    // EasyStyling
    titleText: {
        fontSize: 18,
    },
    subTitleText: {
        fontSize: 14,
    },
    boldFont: {
        fontWeight: "bold",
    },
    buttonListItem: {
        marginVertical: 4,
    },

    primaryBg: {
        backgroundColor: primary,
    },
    secondaryBg: {
        backgroundColor: secondary,
    },
    accentBg: {
        backgroundColor: accent,
    },
    altBg: {
        backgroundColor: alt,
    },
    primaryText: {
        color: primary,
    },
    secondaryText: {
        color: secondary,
    },
    accentText: {
        color: accent,
    },
    blackBorder: {
        borderStyle: 'solid', 
        borderWidth: 1, 
        borderColor: secondary
    },

    // SpecificConps
    ppImage: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: primary,
    },
    ppImageOption: {
        height: 60,
        width: 60,
        borderRadius: 40,
        backgroundColor: primary,
    },
    ppImageSelected: {
        borderColor: primary,
        borderRadius: 40,
        borderWidth: 3,
    },
    waveContainer: {
        height:40,
        overflow: "hidden",
        flexDirection: "row-reverse",
    },
    fabFixedView: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    FabButton: {
        color: altAccent,
        overlayColor: altAccent,
        padding: 2,
    },
    searchBarContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    formInputContainer: {
        padding: 18,
        borderRadius: 32,
        //flex: 1,
        width: "100%"
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor: primary,
    },

    // OLD

    page: {
        width: "100%",
    },

    cocktailList: {
        backgroundColor: '#E0FBFC',
        width: "100%",
    },

    itemContainer: {
        backgroundColor: '#98C1D9',

        paddingVertical: 15,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 15,

        borderRadius: 40,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    plainItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ingredientEditItemContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    itemIcon: {
        marginRight: 15,
    },
    itemText: {
        fontSize: 18,
        maxWidth: '80%',
    },
    itemLeft: {
        flexDirection: 'row',
        alight: 'center',
        flexWrap: 'wrap',
    },
    ingredientList: {
        overflow: 'hidden',
        paddingHorizontal: 15,
        backgroundColor: '#D7F1BB',

        borderRadius: 40,
        marginHorizontal: 20,
    },
    ingredientListInner: {
        marginTop: 20,
    },
    ingredientViewerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemIconDivided: {
        marginRight: 15,
        borderRightWidth: 1,
        borderRightColor: "#383F51",
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    inputContainer: {
        margin: 12,
        paddingHorizontal: 12,
    },
    inputLabel: {
        fontSize: 18,
    },
    inputInactive: {
        color: "#AAA",
        borderColor: "#AAA",
    },
    errorText: {
        color: "#C00",
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    checkbox: {
        alignSelf: 'center',
    },
    w100: {
        width: "100%",
    },

});

export default styles;