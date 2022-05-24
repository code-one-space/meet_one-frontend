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
        {id : 0, text: "Person 1" },
        {id : 1, text: "Person 2 " }
    ]);
    const [exampleState, setExampleState] = useState(initialPerson);
    const [idx, incr] = useState(0);

    const addPerson = () => {
        let newArray = [...initialPerson , {id : idx, text: "Person " + (idx+1) }];
        incr(idx + 1);
        setExampleState(newArray);
        changeEl(newArray);
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
                                    <PersonButton title={item.item.text} onPress={() => {}}/>
                                    )}
                            />
            </View>
            <View style={style.containerButton} >
                <View style={style.button}>
                    <Button  title={"Leave Team"}  onPress={() => callConfirmScreen(navigation)}/>
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
