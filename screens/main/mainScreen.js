import {Text, View, SafeAreaView, ScrollView, BackHandler} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PersonButton, Button, ToolsListItem, AddToolButton } from "@@components";
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
    let activeTool = false;

    useEffect(() => {
        let interval = setInterval(refreshAllData, 4000);
        return () => clearInterval(interval);
    }, []);

    let memberButtons = members?.map(member => {
        return (
            <PersonButton key={ member?.id } title={ member?.name } color={"yellow"} /> // TODO replace color with given hat
        )})

    function refreshAllData() {
        HttpClient.getMeetingInformation().then(data => {
            if (Object.keys(data??{}).length == 0)
                return;
            setMembers([...data.members]);
        }).catch(console.error);
    }

    function handleStartStopTool() {
        if (!activeTool) {
            HttpClient.startTool().then(data => {
                console.log(data);
                activeTool = true;
                setSixHatsButtonTitle("Stop 6 Hats");
                refreshAllData();
            }).catch(console.error);
        } else {
            HttpClient.quitTool().then(() => {
                activeTool = false;
                setSixHatsButtonTitle("Start 6 Hats");
                refreshAllData();
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
                <Button title={sixHatsButtonTitle} onPress={handleStartStopTool}/>
            </View>
        </SafeAreaView>
    )
}
