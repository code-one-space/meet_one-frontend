import { Text, View,SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button,PersonButton } from "@@components";
import { BackHandler } from "react-native";
import * as Navigation from "../../Navigation";
import * as HttpClient from "../../HttpClient";
import {useEffect, useState} from "react";

import style from './mainscreen.style';

export default function MainScreen ({ navigation }) {

    const [user, setUser]  = useState({});

    const [members, setMembers]  = useState([
        {id: "628d0aed1892fd99cf1bb540", name: "Janik"}, {id: "628d0aed1892fd99cf1bb541", name: "Nojo"}, {id: "628d0aed1892fd99cf1bb542", name: "Immanuel"}
    ]);

    const updateMemberList = (listFromDb) => {
        if (Object.keys(listFromDb??{}).length == 0)
            return;

        let newData = [...listFromDb];
        setMembers(newData);
        setUser(newData[0]);
    }

    const handleBackButton = () => {
        setUser({});

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

    const fetchMembers = async () => {
        return await HttpClient.getAllMembers();
    }

    let interval = null;

    useEffect(() => {
        interval = setInterval(() => {
            fetchMembers().then(data => {
                console.log(data);
                updateMemberList(data);
            }).catch(console.error);
        }, 4000);
    }, []);

    /*useEffect(() => {
        // componentWillUnmount
        return () => {
            clearInterval(interval);
        }
    }, [user]);*/

    /*useEffect(() => {
        // componentWillUnmount
        return () => {
            clearInterval(interval);
            interval = setInterval(() => {
                fetchMembers().then(data => {
                    console.log(data);
                    updateMemberList(data);
                }).catch(console.error);
            }, 4000);
        }
    }, [members]);*/

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    let memberButtons = members?.map(member => {
        return (
            <PersonButton key={ member?.id } title={ member?.name }/>
        )})

    const callConfirmScreen = navigation => {

        navigation.navigate(
            "ConfirmScreen",
            { message: "Do you want to leave the Team?", functionToCall: HttpClient.leaveMeeting }
        )
    }

    return (
        <SafeAreaView style = {style.container}>
            <View>
                <StatusBar style="auto" />
            </View>
            <View style={style.list}>
                {/*<FlatList
                                style={style.list}
                                nestedScrollEnabled
                                keyExtractor = {item => item.id}
                                data={members}
                                renderItem = {item => (
                                    <PersonButton title={item.name} onPress={() => {}}/>
                                    )}
                            />*/}
                <ScrollView>
                    {memberButtons}
                </ScrollView>
            </View>
            <View style={style.containerButton} >
                <View style={style.button}>
                    <Button  title={"Leave Team"} onPress={() => callConfirmScreen(navigation)}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
