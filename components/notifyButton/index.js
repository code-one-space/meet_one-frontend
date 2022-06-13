import * as Icon from "react-native-feather";
import { TouchableOpacity } from "react-native";
import buttonStyle from './notifyButton.style';

export default function NotifyButton ({onPress}) {
    return (
        <TouchableOpacity style={buttonStyle.button} onPress={onPress}>
            <Icon.Send stroke="white" fill="#000000" width={30} height={30} />
        </TouchableOpacity>
    );
}
