import {View, SafeAreaView, ScrollView, BackHandler} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PersonButton } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";
import {useEffect, useState} from "react";

import style from './mainscreen.style';
import * as HardwareBackButtonHandler from "../../shared/backButtonHandler/backButtonHandler";

export default function MainScreen ({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave

    const [members, setMembers]  = useState([
        {id: "0", name: route.params.memberName} // request takes long time -> show own name before success
    ]);

    const updateMemberList = (listFromDb) => {

    }

    const fetchMembers = async () => {
        return await HttpClient.getAllMembers();
    }

    useEffect(() => {
        let interval = setInterval(() => {
            fetchMembers().then(data => {
                console.log(data);

                if (Object.keys(data??{}).length == 0)
                    return;

                setMembers([...data]);
            }).catch(console.error);
        }, 4000);
        return () => {
            console.log("Clearing Interval in cleanup function");
            clearInterval(interval);
        }
    }, []);

    let memberButtons = members?.map(member => {
        return (
            <PersonButton key={ member?.id } title={ member?.name }/>
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
