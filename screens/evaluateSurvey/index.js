import style from "./evaluateSurveyScreen.style";
import {SurveyAnswerListItem} from "@@components";
import {SafeAreaView, Text, View, FlatList} from "react-native";

export default function EvaluateSurveyScreen({ route }) {
    const { survey } = route.params;

    let list;
    if (survey.answers.length == 0)
        list = <Text style={style.noListText}>No one has answered this survey until now</Text>
    else
        list = <FlatList style={style.list} data={survey.answers} renderItem={renderItem} keyExtractor={item => item.id}/>

    function renderItem({ item }) {
        return <SurveyAnswerListItem answer={item}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.question}>{survey.question}</Text>
            {list}
        </SafeAreaView>
    )
}
