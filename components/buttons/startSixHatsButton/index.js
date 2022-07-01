import style from "./StartSixHatsButton.style";
import { Image, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

export default function StartSixHatsButton({ onPress, title }) {
    const [disabled, setDisabled] = useState(false);
    let timeout = 0

    useEffect(() => {

        function reset() {
            setDisabled(false)
        }

        timeout = setTimeout(reset, 300)

        return () => clearTimeout(timeout)
    })

    return (
        <TouchableOpacity disabled={disabled} style={style.container} onPress={() => {setDisabled(true); onPress();}}>
            <Image style={style.image} source={require("@@assets/hats/white.png")}/>
            <Text style={style.text}>{title}</Text>
        </TouchableOpacity>
    )
}
