import { Text, View, SafeAreaView, Vibration, BackHandler, Modal, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, SelectNotificationButton, InfoModal, TeamListItem, StartSixHatsButton, GoToSurveysButton, ChoiceModal } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";
import React, { useEffect, useState } from "react";
import style from './mainscreen.style';
import * as HardwareBackButtonHandler from "../../shared/backButtonHandler/backButtonHandler";
import { Audio } from 'expo-av';
import { render } from "react-dom";

export default function MainScreen ({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave

    const { meetingId } = route.params;

    let [id, setMeetingId] = useState(meetingId);
    const [sound, setSound] = useState()

    const [surveys, setSurveys] = useState([]);

    // notification received modal
    let [notificationMessage, setNotificationMessage] = useState("")
    let [notificationVisible, setNotificationVisible] = useState(false)

    async function playSound() {

        const { sound } = await Audio.Sound.createAsync(
            require('@@assets/notification/cyber.mp3')
        );
        setSound(sound);
        await sound.playAsync()
    }

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync()
        } : undefined
    })

    const [members, setMembers]  = useState([
        { id: "0", name: route.params.memberName } // request takes long time -> show own name before success
    ]);

    const [sixHatsButtonTitle, setSixHatsButtonTitle] = useState("Start Six Hats");
    let [tool, setTool] = useState("");

    const [selectNotificationVisible, setSelectNotificationVisible] = useState(false);
    const [notificationReceiver, setNotificationReceiver] = useState(undefined);
    let interval = 0;

    useEffect(() => {
        let refreshAllData = () => {
            HttpClient.getMeetingInformation().then(data => {
                if (Object.keys(data ?? {}).length == 0)
                    return;

                let members = [...data.members].sort(function(memberA, memberB) {
                    if (memberA.id == HttpClient.memberId)
                        return -1;
                    if (memberB.id == HttpClient.memberId)
                        return 1;
                    return memberA.name.toLowerCase().localeCompare(memberB.name);
                })
                setMembers(members);

                setTool(data.currentTool);
                setSixHatsButtonTitle(data.currentTool == "" ? "Start Six Hats" : "Stop Six Hats");

                let notifications = data?.members.filter(member => member?.id == HttpClient.memberId)[0]?.notifications;
                if (!!notifications) {
                    for (let notification of notifications) {
                        setNotificationMessage(notification?.message ?? "")
                        setNotificationVisible(true)
                        // alert("Notification received: " + notification.message);
                        playSound()
                        const interval = setInterval(() => Vibration.vibrate(), 1000) // vibrate every second
                        setTimeout(() => clearInterval(interval), 5000) // stop vibrating after 5s
                        HttpClient.deleteNotification(notification.id);
                    }
                }
            }).catch(console.error);
        }

        refreshAllData();
        interval = setInterval(() => refreshAllData(), 2000);
        return () => {
            clearInterval(interval)
            // setMembers([])
        };
    }, [id])

    const handleOpenSendNotificationPopUp = (member) => {
        setNotificationReceiver(member);
        setSelectNotificationVisible(true);
    }

    const handleSendNotification = (message) => {
        HttpClient.createNotification(notificationReceiver.id, message);
        setSelectNotificationVisible(!selectNotificationVisible);
    }

    let handleStartStopTool = () => {
        if (tool == "") {
            HttpClient.startTool().then(data => {
                setTool(data.currentTool);
                setMembers([...data?.members]);
                setSixHatsButtonTitle("Stop Six Hats");
            }).catch(console.error)
        } else {
            HttpClient.quitTool().then(data => {
                setTool("");
                setMembers([...data?.members]);
                setSixHatsButtonTitle("Start Six Hats");
            }).catch(console.error);
        }
    }

    function renderItem({ item }) {
        return <TeamListItem
            title={item?.name}
            color={item?.hat}
            showNotificationButton={item?.id !== HttpClient.memberId && item?.id !== "0"}
            onPressNotification={() => handleOpenSendNotificationPopUp(item)}/>
    }

    // performance
    function hideNotificationReceivedModal() {
        setNotificationVisible(false)
    }

    function renderData({ item }) {

    }

    return (
        <SafeAreaView style={style.container}>

            <InfoModal
                title={"Notification"}
                text={notificationMessage}
                visible={notificationVisible}
                onRequestClose={hideNotificationReceivedModal}
            />
            {/* TODO auslagern in eigene component */}
            <ChoiceModal 
                onRequestClose={() => {setSelectNotificationVisible(false)}} 
                title={notificationReceiver?.name}
                renderData={renderData}
                choices={["Come on, time's up!", "Can I ask a question?"]}></ChoiceModal>
            {/* <Modal
                transparent={true}
                visible={selectNotificationVisible}
                onRequestClose={() => setSelectNotificationVisible(!selectNotificationVisible)}>
                <View style={style.modalContainer}>
                    <View style={style.modalInnerContainer}>
                        <Text style={style.modalHeader}>{notificationReceiver?.name}</Text>
                        <View style={style.modalButtonContainer}>
                            <SelectNotificationButton title={"Come on, time's up!"} white={true} onPress={() => handleSendNotification("Come on, time's up!")}/>
                        </View>
                        <View style={style.modalButtonContainer}>
                            <SelectNotificationButton title={"Can I ask a question?"} white={true} onPress={() => handleSendNotification("Can I ask a question?")}/>
                        </View>
                        <View style={style.modalButtonContainer}>
                            <Button title={"Cancel"} onPress={() => setSelectNotificationVisible(!selectNotificationVisible)}/>
                        </View>
                    </View>
                </View>
            </Modal> */}
            <StatusBar style="auto" />

            <FlatList style={style.list} data={members} renderItem={renderItem} keyExtractor={member => member.id}/>

            <StartSixHatsButton title={sixHatsButtonTitle} spamProtection={true} onPress={() => handleStartStopTool()}/>
            <GoToSurveysButton onPress={() => navigation.navigate("AllSurveysScreen", { userName: members[0].name, surveys: surveys })}/>
        </SafeAreaView>
    )
}
