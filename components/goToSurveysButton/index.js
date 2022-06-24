import style from "./GoToSurveysButton.style"
import {Text, TouchableOpacity} from "react-native";
import {Edit} from "react-native-feather";

export default function GoToSurveyButton({ onPress }) {
    return (
        <TouchableOpacity style={style.container} onPress={onPress}>
            <Text style={style.text}>Surveys</Text>
            <Edit height={40} width={40} strokeWidth={1.5} stroke={"white"} fill={"black"}/>
        </TouchableOpacity>
    )
}
