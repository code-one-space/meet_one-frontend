import style from "./evaluateSurveyScreen.style";
import {SurveyAnswerListItem} from "@@components";
import {SafeAreaView, Text, View, FlatList} from "react-native";
import * as HttpClient from "../../shared/httpClient/httpClient";
import {useEffect, useState} from "react";

export default function EvaluateSurveyScreen({ route }) {
    const { initialSurvey: initialSurvey } = route.params;
    const [survey, setSurvey] = useState(initialSurvey);

    useEffect(() => {
        let refreshAllData = () => {
            HttpClient.getMeetingInformation().then(data => {
                if (Object.keys(data ?? {}).length == 0)
                    return;

                setSurvey(data.surveys.filter(survey => survey.id == initialSurvey.id)[0]);
            })
        }

        refreshAllData();
        let interval = setInterval(() => refreshAllData(), 2000);
        return () => clearInterval(interval)
    }, []);

    let list;
    if (survey && survey?.answers.length == 0 || !survey && initialSurvey.answers.length == 0)
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
