import {Text, View, SafeAreaView, ScrollView, BackHandler} from "react-native";
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
                setTool(data.currentTool)
                setSixHatsButtonTitle(data.currentTool == "" ? "Start Six Hats" : "Stop Six Hats");
            }).catch(console.error);
        }

        let interval = setInterval(() => refreshAllData(), 4000);
        return () => clearInterval(interval);
    }, []);

    let memberButtons = members?.map(member => {
        return (
            <View style={style.PersonButton} key={ member?.id }   >
                <PersonButton  title={ member?.name } color = { member?.hat } />
                <NotifyButton/>
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
