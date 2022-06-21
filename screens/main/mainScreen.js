import { Text, View, SafeAreaView, Vibration, BackHandler, Modal, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, PersonButton, NotifyButton, SelectNotificationButton, InfoModal } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";
import React, { useEffect, useState } from "react";
import style from './mainscreen.style';
import * as HardwareBackButtonHandler from "../../shared/backButtonHandler/backButtonHandler";
import { Audio } from 'expo-av';
import { Info } from "react-native-feather";

export default function MainScreen ({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave
    
    const { meetingId } = route.params;
    
    let [id, setMeetingId] = useState(meetingId);
    const [sound, setSound] = useState()

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
                    return memberA.name.localeCompare(memberB.name);
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

    function handleStartPoll() {
        navigation.navigate("CreatePollScreen");
    }

    function renderItem(member) {
        member = member.item;
        if (member?.id === HttpClient.memberId || member?.id === "0")
            return <PersonButton title={ member?.name } color = { member?.hat }/>

        return (
            <View style={ style.personButton }>
                <PersonButton title={ member?.name } color = { member?.hat }/>
                <NotifyButton onPress={() => handleOpenSendNotificationPopUp(member)}/>
            </View>
        )
    }

    // performance
    function hideNotificationReceivedModal() {
        setNotificationVisible(false)
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
            <Modal
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
            </Modal>
            <View>
                <StatusBar style="auto" />
            </View>
            <View style={style.list}>
                <FlatList data={members} renderItem={renderItem} keyExtractor={member => member.id}/>
            </View>
            <Button buttonStyle={style.start6HatsButton} title={sixHatsButtonTitle} spamProtection={true} onPress={() => handleStartStopTool()}/>
            <Button buttonStyle={style.start6HatsButton} title={"Start Poll"} spamProtection={true} onPress={() => handleStartPoll()}/>
        </SafeAreaView>
    )
}
