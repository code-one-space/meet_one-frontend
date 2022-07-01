import {TouchableOpacity, View, Image} from "react-native";
import shareButtonStyle from "./shareButton.style";
import * as navigation from "shared/navigation/navigation";
import { Share2 } from "react-native-feather";

export default function ShareButton () {
    return (
            <TouchableOpacity onPress={() => navigation.navigate("ShareScreen") }>
                <View style={shareButtonStyle.container}>
                    <Share2 height={25} width={25} fill={"black"} stroke={"white"} strokeWidth={1.5} style={shareButtonStyle.image}/>
                </View>
            </TouchableOpacity>
    );
}
