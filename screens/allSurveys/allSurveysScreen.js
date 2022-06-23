import style from "./allSurveysScreen.style";
import {SafeAreaView, Text, View, FlatList} from "react-native";
import {useState, useEffect} from "react";
import {AddFloatingActionButton, SurveyListItem} from "@@components"


export default function AllSurveysScreen({ navigation, route }) {
    let { userName, surveys } = route.params;

    const [surveysASDF, setSurveysASDF] = useState(surveys);

    function renderItem({ item }) {
        return <SurveyListItem survey={item}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.headerContainer}>
                <Text style={style.headerText}>All Surveys</Text>
                <AddFloatingActionButton style={style.addSurveyButton} onPress={() => navigation.navigate("CreateSurveyScreen", { creatorName: userName })}/>
            </View>

            <FlatList style={style.list} data={surveysASDF} renderItem={renderItem} keyExtractor={survey => survey.id}/>
        </SafeAreaView>
    )
}
