import style from "./SurveyAnswerCheckboxButton.style"
import {Image, Text, TouchableOpacity} from "react-native";
import {CheckSquare, Square} from "react-native-feather";

export default function SurveyAnswerCheckbox({ onPress, title, choice, selectedAnswers, white, ...rest }) {
    let buttonBackground = white ? "white" : "black";
    let buttonText = white ? "black" : "white";

    let isChecked = selectedAnswers.indexOf(title) != -1;

    if (isChecked)
        return (
            <TouchableOpacity style={[style.button, {backgroundColor: buttonBackground}, {borderColor: "green"}]} onPress={onPress}>
                <CheckSquare style={style.icon} width={25} height={25} stroke={"black"} />
                <Text style={[style.text, {color: buttonText}]}>{title}</Text>
            </TouchableOpacity>)
    else
        return (
            <TouchableOpacity style={[style.button, {backgroundColor: buttonBackground}]} onPress={onPress}>
                <Square style={style.icon} width={25} height={25} stroke={"black"} fill={"white"}/>
                <Text style={[style.text, {color: buttonText}]}>{title}</Text>
            </TouchableOpacity>
        )
}
