import style from "./allSurveysScreen.style";
import {SafeAreaView, Text, View, FlatList, TextInput} from "react-native";
import {useState, useEffect} from "react";
import {AddFloatingActionButton, SurveyListItem, SelectNotificationButton} from "@@components";
import AnswerSurveyModal from "../../components/modal/answerSurveyModal/index";
import * as HttpClient from "../../shared/httpClient/httpClient";

export default function AllSurveysScreen({ navigation, route }) {

    let { userName } = route.params;

    let [surveys, setSurveys] = useState([]);
    let [selectedSurvey, setSelectedSurvey] = useState({ choices: [] }); // prevent undefined is not an object on screen mount
    let [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        let refreshSurveys = () => HttpClient.getMeetingInformation().then((data) => {
            if (Object.keys(data ?? {}).length == 0)
                return;

            setSurveys(data.surveys);
            }).catch(console.error);
        refreshSurveys();
        let interval = setInterval(refreshSurveys, 2000);
        return () => clearInterval(interval);
    }, [userName])

    function handleAnswerSurvey(survey) {
        setSelectedSurvey(survey);
        setModalVisible(true);
    }

    function renderItem({ item }) {
        return <SurveyListItem
            survey={item}
            onPressInfo={() => navigation.navigate("EvaluateSurveyScreen", { initialSurvey: item })}
            onPressAnswer={() => handleAnswerSurvey(item)}
        />
    }

    return (
        <SafeAreaView style={style.container}>
            <AnswerSurveyModal
                visible={modalVisible}
                backgroundClickDisabled={true}
                onRequestClose={() => { setModalVisible(false) }}
                survey={selectedSurvey}
                userName={userName}
            />
            <View style={style.headerContainer}>
                <Text style={style.headerText}>All Surveys</Text>
                <AddFloatingActionButton
                    style={style.addSurveyButton}
                    onPress={() => navigation.navigate("CreateSurveyScreen", { creatorName: userName })}
                />
            </View>

            <FlatList style={style.list} data={surveys} renderItem={renderItem} keyExtractor={survey => survey.id}/>
        </SafeAreaView>
    )
}
