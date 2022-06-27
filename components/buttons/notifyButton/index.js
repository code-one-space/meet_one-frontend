import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import style from './notifyButton.style';

export default function NotifyButton ({onPress}) {
    return (
        <TouchableOpacity style={style.buttonContainer} onPress={onPress}>
            <Icon.Send stroke="white" fill="#000000" width={25} height={25} style={style.image}/>
        </TouchableOpacity>
    );
}
