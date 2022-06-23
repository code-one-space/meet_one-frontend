import style from "./allSurveysScreen.style";
import {SafeAreaView, Text, View, FlatList} from "react-native";
import {useState} from "react";
import {AddFloatingActionButton, SurveyListItem} from "@@components"


export default function AllSurveysScreen({ navigation, route }) {
    let { userName } = route.params;

    const [surveys, setSurveys] = useState([]);

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
