import {View, SafeAreaView, ScrollView,Text, BackHandler} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button ,PersonButton, NotifyButton } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";
import {useEffect, useState} from "react";


import style from './mainscreen.style';
import * as HardwareBackButtonHandler from "../../shared/backButtonHandler/backButtonHandler";

export default function MainScreen ({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave

    const [members, setMembers]  = useState([
        {id: "0", name: route.params.memberName  } // request takes long time -> show own name before success
    ]);


    useEffect(() => {
        let interval = setInterval(() => {
            HttpClient.getAllMembers().then(data => {
                if (Object.keys(data??{}).length == 0)
                    return;
                setMembers([...data]);
            }).catch(console.error);
        }, 4000);
            return () => clearInterval(interval);
    }, []);

    let memberButtons = members?.map(member => {
        return (
            <View style={style.PersonButton} key={ member?.id }   >
                <PersonButton  title={ member?.name } color = {"yellow"} />
                <NotifyButton/>
            </View>

        )})

    return (
        <SafeAreaView style={style.container}>
            <View>
                <StatusBar style="auto" />
            </View>
            <View style={style.list}>
                <ScrollView>
                    {memberButtons}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
