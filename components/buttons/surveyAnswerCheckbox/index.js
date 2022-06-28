import style from "./SurveyAnswerCheckboxButton.style"
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {CheckSquare, Square} from "react-native-feather";

export default function SurveyAnswerCheckbox({ onPress, title, choice, selectedAnswers, white, ...rest }) {
    let buttonBackground = white ? "white" : "black";
    let buttonText = white ? "black" : "white";

    let isChecked = selectedAnswers.indexOf(title) != -1;

    if (isChecked)
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[style.button, {backgroundColor: buttonBackground}, {borderColor: "green"}]}>
                    <CheckSquare style={style.icon} width={25} height={25} stroke={"black"} />
                    <Text style={[style.text, {color: buttonText}]}>{title}</Text>
                </View>
            </TouchableWithoutFeedback>)
    else
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[style.button, {backgroundColor: buttonBackground}]}>
                    <Square style={style.icon} width={25} height={25} stroke={"black"} fill={"white"}/>
                    <Text style={[style.text, {color: buttonText}]}>{title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
}
