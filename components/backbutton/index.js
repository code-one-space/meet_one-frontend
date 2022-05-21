import { View, TouchableOpacity, Image } from 'react-native';
import buttonStyle from './backbutton.style';
import * as navigation from "Navigation";

export default function BackButton ({ white }) {
    const imageSource = white ? require("../../assets/BackButtonWhite.png") : require("../../assets/BackButtonBlack.png")
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={buttonStyle.container}>
                <Image source={imageSource} style={buttonStyle.image}/>
            </View>
        </TouchableOpacity>
    );
}
