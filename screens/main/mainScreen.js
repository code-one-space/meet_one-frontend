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

    const [tools, setTools] = useState([]);

    useEffect(() => {
        let interval = setInterval(refreshAllData, 4000);
        return () => clearInterval(interval);
    }, []);

    let memberButtons = members?.map(member => {
        return (
            <PersonButton key={ member?.id } title={ member?.name } color={"yellow"} /> // TODO replace color with given hat
        )})

    let toolButtons = tools?.map(tool => {
        return <ToolsListItem key={tool?.id} title={ tool?.toolType } timestamp={ tool?.createdAt } done={ tool?.done } onPress={ () => handleQuitTool(tool.id) }/>;
    });

    function refreshAllData() {
        HttpClient.getMeetingInformation().then(data => {
            if (Object.keys(data??{}).length == 0)
                return;
            setMembers([...data.members]);
            setTools(data.tools);
        }).catch(console.error);
    }

    function handleQuitTool(toolId) {
        HttpClient.quitTool(toolId);
        refreshAllData();
    }

    function handleStartTool() {
        HttpClient.startTool("devils_advocat", members).then(data => {
            setTools(data.tools); // TODO sometimes this triggers "undefined is not an object" on first try
            console.log(data);
        }).catch(console.error);
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
            <View style={style.toolsHeader}>
                <Text style={style.text}>Tools in this Meeting</Text>
                <AddToolButton onPress={() => handleStartTool()}/>
            </View>
            <View style={style.list}>
                <ScrollView>
                    {toolButtons}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
