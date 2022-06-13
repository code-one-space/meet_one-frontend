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
    let tool = "";

    useEffect(() => {
        let interval = setInterval(() => refreshAllData(tool), 4000);
        return () => clearInterval(interval);
    }, []);

    let memberButtons = members?.map(member => {
        return (
            <PersonButton key={ member?.id } title={ member?.name } color={ member?.hat } />
        )})

    const setActiveTool = (activeTool) => {
        tool = activeTool;
    }

    function refreshAllData() {
        HttpClient.getMeetingInformation().then(data => {
            if (Object.keys(data??{}).length == 0)
                return;
            setMembers([...data.members]);
            setActiveTool(data.currentTool);
            console.log("activeTool: " + tool);
            setSixHatsButtonTitle(tool === "" ? "Start Six Hats" : "Stop Six Hats");
        }).catch(console.error);
    }

    function handleStartStopTool() {
        debugger;
        console.log("activeTool on call handleStartStopTool: " + tool);
        if (tool === "") {
            HttpClient.startTool().then(data => {
                console.log("Response of start tool: " + JSON.stringify(data));
                setActiveTool(data.currentTool);
                console.log("currentTool from response: " + data.currentTool);
                console.log("active tool after start: " + tool);
                setSixHatsButtonTitle("Stop 6 Hats");
                refreshAllData(tool);
            }).catch(console.error);
        } else {
            HttpClient.quitTool().then(() => {
                console.log("Quitting Tool");
                setActiveTool("");
                setSixHatsButtonTitle("Start 6 Hats");
                refreshAllData(tool);
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
