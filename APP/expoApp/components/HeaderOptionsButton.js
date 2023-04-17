import { TouchableOpacity, Text } from 'react-native';import { SimpleLineIcons } from '@expo/vector-icons'; 

function HeaderOptionsButton ({showOptions, setShowOptions}) {
    return(
        <TouchableOpacity
            onPress={() => {
                setShowOptions(!showOptions);
            }}
            title="Info"
            color="#fff"
            style={{ marginRight: 15 }}>

            <SimpleLineIcons name="options" size={24} color="black" />

        </TouchableOpacity>
    )
}

export default HeaderOptionsButton;