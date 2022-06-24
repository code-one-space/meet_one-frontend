import style from "./evaluateSurveyScreen.style";
import {SurveyAnswerListItem} from "@@components";
import {SafeAreaView, Text, View, FlatList} from "react-native";

export default function EvaluateSurveyScreen({ route }) {
    // const { survey } = route.params;

    const survey = {
        question: "How are you today?",
        answers: [
            {
                memberName: "Janik",
                answer: "Not bad!",
            },
            {
                memberName: "Max Mustermann",
                answer: "I hate people",
            },
            {
                memberName: "Erika Musterfrau",
                answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            },
            {
                memberName: "Erika Musterfrau",
                answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            },
            {
                memberName: "Erika Musterfrau",
                answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            }
        ]
    }

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
