import {TouchableOpacity, ImageBackground, View, Text, Image} from "react-native";
import shareButtonStyle from "./shareButton.style";

export default function ShareButton ({ navigation }) {
    return (
            <TouchableOpacity onPress={() => navigation.navigate("ShareScreen")}>
                <View style={shareButtonStyle.container}>
                    <Image source={require("@@assets/shareIcon.png")} style={shareButtonStyle.image}/>
                </View>
            </TouchableOpacity>
    );
}
