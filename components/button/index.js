import buttonStyle from './button.style';
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";

export default function Button ({ onPress, title, white, spamProtection }) {
    let buttonBackground = white ? "white" : "black";
    let buttonText = white ? "black" : "white";

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
        <TouchableOpacity disabled={disabled} style={[buttonStyle.button, {backgroundColor: buttonBackground}]} onPress={() => 
            {
                if(spamProtection)
                    setDisabled(true)

                onPress();
            }}>
            <Text style={[buttonStyle.text, {color: buttonText}]}>{title}</Text>
        </TouchableOpacity>
    );
}
