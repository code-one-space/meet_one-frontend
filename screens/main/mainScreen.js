import {Text, View, SafeAreaView, ScrollView, BackHandler, Alert} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button ,PersonButton, NotifyButton, AddToolButton, ToolsListItem } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";
import {useEffect, useState} from "react";


import style from './mainscreen.style';
import * as HardwareBackButtonHandler from "../../shared/backButtonHandler/backButtonHandler";

export default function MainScreen ({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave

    const [members, setMembers]  = useState([
        { id: "0", name: route.params.memberName } // request takes long time -> show own name before success
    ]);

    const [sixHatsButtonTitle, setSixHatsButtonTitle] = useState("Start Six Hats");
    let [tool, setTool] = useState("");

    useEffect(() => {
        let refreshAllData = () => {
            HttpClient.getMeetingInformation().then(data => {
                if (Object.keys(data ?? {}).length == 0)
                    return;
                setMembers([...data.members]);
                setTool(data.currentTool);
                setSixHatsButtonTitle(data.currentTool == "" ? "Start Six Hats" : "Stop Six Hats");

                let notifications = data?.members.filter(member => member?.id == HttpClient.memberId)[0].notifications;
                if (!!notifications) {
                    for (let notification of notifications) {
                        alert("Notification received: " + notification.message);
                        HttpClient.deleteNotification(notification.id);
                    }
                }
            }).catch(console.error);
        }

        refreshAllData();
        let interval = setInterval(() => refreshAllData(), 4000);
        return () => clearInterval(interval);
    }, []);

    const handleSendNotification = (memberId) => {
        Alert.alert(
            "Send Notification",
            "Type your Message",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Send",
                    onPress: () => HttpClient.createNotification(memberId, "asdf"),
                    style: "default",
                },
            ],
        );

    }

    let memberButtons = members?.map(member => {
        if (member?.id === HttpClient.memberId || member?.id === "0")
            return <PersonButton key={ member?.id } title={ member?.name } color = { member?.hat }/>

        return (
            <View style={ style.PersonButton } key={ member?.id }>
                <PersonButton title={ member?.name } color = { member?.hat }/>
                <NotifyButton onPress={() => handleSendNotification(member?.id)}/>
            </View>

        )})

    let handleStartStopTool = () => {
        if (tool == "") {
            HttpClient.startTool().then(data => {
                setTool(data.currentTool);
                setMembers([...data?.members])
                setSixHatsButtonTitle("Stop Six Hats");
            }).catch(console.error)
        } else {
            HttpClient.quitTool().then(data => {
                setTool("");
                setMembers([...data?.members])
                setSixHatsButtonTitle("Start Six Hats");
            }).catch(console.error);
        }
    }

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
            <View style={style.start6HatsButton}>
                <Button title={sixHatsButtonTitle} onPress={() => handleStartStopTool()}/>
            </View>
        </SafeAreaView>
    )
}
