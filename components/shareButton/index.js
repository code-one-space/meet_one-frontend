import {TouchableOpacity, ImageBackground, View, Text, Image} from "react-native";
import shareButtonStyle from "./shareButton.style";
import * as navigation from "Navigation";

export default function ShareButton () {
    return (
            <TouchableOpacity onPress={() => navigation.navigate("ShareScreen") }>
                <View style={shareButtonStyle.container}>
                    <Image source={require("@@assets/shareIcon.png")} style={shareButtonStyle.image}/>
                </View>
            </TouchableOpacity>
    );
}
