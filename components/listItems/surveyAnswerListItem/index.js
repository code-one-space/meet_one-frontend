import style from "./surveyAnwerListItem.style"
import {View, Text} from "react-native"

export default function SurveyAnswerListItem({ answer }) {
    return (
        <View style={style.container}>
            <Text style={style.title}>{answer.memberName}</Text>
            <Text style={style.answer}>{answer.answer}</Text>
        </View>
    )
}
