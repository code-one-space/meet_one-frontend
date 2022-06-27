import style from "./GoToSurveysButton.style"
import {Text, TouchableOpacity} from "react-native";
import {Edit} from "react-native-feather";

export default function GoToSurveyButton({ onPress }) {
    return (
        <TouchableOpacity style={style.container} onPress={onPress}>
            <Edit height={30} width={30} strokeWidth={1.5} stroke={"white"} fill={"black"}/>
            <Text style={style.text}>Surveys</Text>
        </TouchableOpacity>
    )
}
