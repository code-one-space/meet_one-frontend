import style from './button.style';
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";

export default function Button({ onPress, title, white, spamProtection, buttonStyle, textStyle }) {

    let buttonBackgroundColor = white ? "white" : "black";
    let buttonTextColor = white ? "black" : "white";

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
        <TouchableOpacity disabled={disabled} style={[style.button, buttonStyle ?? {}, { backgroundColor: buttonBackgroundColor }]} onPress={() =>
            {
                if(spamProtection)
                    setDisabled(true)

                onPress();
            }}>
            <Text style={[style.text, textStyle ?? {}, { color: buttonTextColor }]}>{title}</Text>
        </TouchableOpacity>
    );
}
