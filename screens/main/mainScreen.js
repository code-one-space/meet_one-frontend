import { Text, View,SafeAreaView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button,PersonButton } from "@@components";
import { BackHandler } from "react-native";
import * as Navigation from "../../Navigation";
import * as HttpClient from "../../HttpClient";
import {useState} from "react";

import style from './mainscreen.style';

export default function MainScreen ({ navigation }) {

    const [initialPerson, changeEl]  = useState([
        {id: "628d0aed1892fd99cf1bb540", name: "Janik"}, {id: "628d0aed1892fd99cf1bb541", name: "Nojo"},
    ]);

    const [person, changeEle]  = useState([
        [{id: "628d0aed1892fd99cf1bb540", name: "Janik"}, {id: "628d0aed1892fd99cf1bb541", name: "Nojo"}, {id: "628d0aed1892fd99cf1bb542", name: "Immanuel"}]
    ]);
    const [exampleState, setExampleState] = useState(initialPerson);

/*    const [idx, incr] = useState(0);

    const addPerson = () => {
        let newArray = [...initialPerson ,  {id: "628d0aed1892fd99cf1bb542", name: "Immanuel"}];
        incr(idx + 1);
        setExampleState(newArray);
        changeEle(newArray);
    }*/

    const handleRefList = (listFromDb) => {

        let newData = [...listFromDb];
        setExampleState(newData);
        changeEl(newData);
    }

    const handleBackButton = () => {
        if (Navigation.getCurrentRouteName() === "MainScreen") {
            callConfirmScreen(navigation);
            return true;
        } else if (Navigation.getCurrentRouteName() === "StartScreen") {
            BackHandler.exitApp();
            return true;
        }
        navigation.goBack();
        return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return (
        <SafeAreaView style = {style.container}>
            <View>
                <Text>This is the MainScreen</Text>
                <StatusBar style="auto" />
            </View>
            <View style={style.list}>
                            <FlatList
                                style={style.list}
                                nestedScrollEnabled
                                keyExtractor = {item => item.id}
                                data={exampleState}
                                renderItem = {item => (
                                    <PersonButton title={item.item.name} onPress={() => {}}/>
                                    )}
                            />
            </View>
            <View style={style.containerButton} >
                <View style={style.button}>
                    <Button  title={"aktulle Team"} onPress={() => handleRefList(person)  }/>
                </View>
                <View style={style.button}>
                    <Button  title={"Leave Team"} onPress={() => callConfirmScreen(navigation)}/>
                </View>
                <View style={style.button}>
                    <Button  title={"Add Tool"}  onPress={() => navigation.navigate("SelectToolScreen")}/>
                </View>

            </View>
        </SafeAreaView>
    )
}

const callConfirmScreen = navigation => {
    navigation.navigate(
        "ConfirmScreen",
        { message: "Do you want to leave the Team?", functionToCall: HttpClient.leaveMeeting }
    )
}
