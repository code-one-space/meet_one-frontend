import style from "./evaluateSurveyScreen.style";
import {SurveyAnswerListItem} from "@@components";
import {SafeAreaView, Text, View, FlatList} from "react-native";

export default function EvaluateSurveyScreen({ route }) {
    const { survey } = route.params;

    function renderItem({ item }) {
        return <SurveyAnswerListItem answer={item}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.question}>{survey.question}</Text>
            <FlatList style={style.list} data={survey.answers} renderItem={renderItem} keyExtractor={item => item.id}/>
        </SafeAreaView>
    )
}
