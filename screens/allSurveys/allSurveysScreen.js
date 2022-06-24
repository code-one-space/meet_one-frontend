import style from "./allSurveysScreen.style";
import {SafeAreaView, Text, View, FlatList} from "react-native";
import {useState, useEffect} from "react";
import {AddFloatingActionButton, SurveyListItem} from "@@components"
import * as HttpClient from "../../shared/httpClient/httpClient";

export default function AllSurveysScreen({ navigation, route }) {

    let { userName } = route.params;

    let [surveys, setSurveys] = useState([]);

    // TODO do this in MainScreen to avoid requests
    useEffect(() => {
        let refreshSurveys = () => HttpClient.getMeetingInformation().then((data) => {
            if (Object.keys(data ?? {}).length == 0)
                return;

            setSurveys(data.surveys);
            }).catch(console.error);
        refreshSurveys();
        let interval = setInterval(refreshSurveys, 4000);
        return () => clearInterval(interval);
    }, [])

    function renderItem({ item }) {
        return <SurveyListItem survey={item}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.headerText}>All Surveys</Text>
                <AddFloatingActionButton style={style.addSurveyButton} onPress={() => navigation.navigate("CreateSurveyScreen", { creatorName: userName })}/>
            </View>

            <FlatList style={style.list} data={surveys} renderItem={renderItem} keyExtractor={survey => survey.id}/>
        </SafeAreaView>
    )
}
