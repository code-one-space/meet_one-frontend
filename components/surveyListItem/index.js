import style from "./surveyListItem.style";
import {Text, TouchableOpacity, View} from "react-native";
import {Info, Edit3} from "react-native-feather";

export default function SurveyListItem({ survey, onPressInfo, onPressAnswer }) {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.infoButton} onPress={onPressInfo}>
                <Text style={style.text}>{survey.question}</Text>
                <Info style={style.infoIcon} stroke="black" fill="white" width={25} height={25}/>
            </TouchableOpacity>

            <TouchableOpacity style={style.answerContainer} onPress={onPressAnswer}>
                <Edit3 stroke="white" fill="#000000" width={25} height={25}/>
            </TouchableOpacity>
        </View>
    )
}
