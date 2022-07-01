import style from "./iconButton.style"
import { Text, TouchableOpacity } from "react-native";
import { Edit, Camera, Play } from "react-native-feather";

function getIconFromName(iconName) {

    switch(iconName) {
        case "edit":
            return (<Edit style={{ color: "white" }} strokeWidth={1.5} width={30} height={30}></Edit>)
        case "camera":
            return (<Camera style={{ color: "white" }} strokeWidth={1.5} width={30} height={30}></Camera>)
        case "start":
            return (<Play style={{ color: "white", margin: 0 }} strokeWidth={1.5} width={30} height={30}></Play>)
    }
}

export default function IconButton({ onPress, iconName, text, buttonStyle, textStyle }) {
    return (
        <TouchableOpacity activeOpacity={iconName == "start" ? 0.75 : undefined} style={[style.container, buttonStyle ?? undefined]} onPress={onPress}>
            {
                getIconFromName(iconName)
            }
            <Text style={[style.text, textStyle ?? undefined]}>{text ?? ""}</Text>
        </TouchableOpacity>
    )
}
