import { Text, View, SafeAreaView, Vibration, BackHandler, Modal, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, SelectNotificationButton, InfoModal, TeamListItem, StartSixHatsButton, GoToSurveysButton, ImageModal } from "@@components";
import * as HttpClient from "../../shared/httpClient/httpClient";
import React, { useEffect, useState } from "react";
import style from './mainscreen.style';
import * as HardwareBackButtonHandler from "../../shared/backButtonHandler/backButtonHandler";
import { Audio } from 'expo-av';

// hats
let greenHat = require("@@assets/hats/green.png")
let redHat = require("@@assets/hats/red.png")
let whiteHat = require("@@assets/hats/white.png")
let blackHat = require("@@assets/hats/black.png")
let blueHat = require("@@assets/hats/blue.png")
let yellowHat = require("@@assets/hats/yellow.png")

export default function MainScreen ({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave

    const { meetingId } = route.params;

    // meeting
    let [id, setMeetingId] = useState(meetingId);
    
    // timer    
    let [timerActive, setTimerActive] = useState(false);
    let [timerEnd, setTimerEnd] = useState(null);
    let [timerText, setTimerText] = useState("");

    // surveys
    const [surveys, setSurveys] = useState([]);
    
    // notification
    let [notificationMessage, setNotificationMessage] = useState("")
    let [notificationVisible, setNotificationVisible] = useState(false)
    const [sound, setSound] = useState()

    // hat modal
    let [hatModalTitle, setHatModalTitle] = useState("")
    let [hatModalText, setHatModalText] = useState("")
    let [hatModalImage, setHatModalImage] = useState(whiteHat)
    let [hatModalVisible, setHatModalVisible] = useState(false)

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

    // set temp member
    const [members, setMembers]  = useState([
        { id: "0", name: route.params.memberName } // request takes long time -> show own name before success
    ]);

    // reset tools
    const [sixHatsButtonTitle, setSixHatsButtonTitle] = useState("Start Six Hats");
    let [tool, setTool] = useState("");

    // set notifications
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

                // set data to state vars
                setMembers(members);
                setTool(data.currentTool);
                setSixHatsButtonTitle(data.currentTool == "" ? "Start Six Hats" : "Stop Six Hats");
                setTimerEnd(new Date(data?.timer.time).getTime() ?? 1)
                setTimerActive(data?.timer.active ?? false)

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

    useEffect(() => {
        let interval = setInterval(() => {
            let date = new Date(timerEnd - Date.now())

            if(timerActive)
                setTimerText(`${(""+date.getUTCHours()).padStart(2, '0')}:${(""+date.getUTCMinutes()).padStart(2, '0')}:${(""+date.getUTCSeconds()).padStart(2, '0')}`)
            else
                setTimerText("00:00:00")
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [timerActive])

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
            onPressNotification={() => handleOpenSendNotificationPopUp(item)}
            onPressPerson={() => {

                if(!item?.hat || item?.hat == "")
                    return;

                switch(item?.hat) {
                    case "red":
                        setHatModalImage(redHat)
                        setHatModalText("I love being the red hat! It is so much fun giving a penny on emotional and personal thoughts!")
                        setHatModalTitle("Explanation - Red")
                        setHatModalVisible(true)
                        break;
                    case "blue":
                        setHatModalImage(blueHat)
                        setHatModalText("I am the blue hat. I am structuring and reassuring. I lead the discussion in important moments.")
                        setHatModalTitle("Explanation - Blue")
                        setHatModalVisible(true)
                        break;
                    case "white":
                        setHatModalImage(whiteHat)
                        setHatModalText("The white hat presents numbers and studies to topics. They are objective.")
                        setHatModalTitle("Explanation - White")
                        setHatModalVisible(true)
                        break;
                    case "black":
                        setHatModalImage(blackHat)
                        setHatModalText("I'm the black hat. I don't like anything. If it is possible for something to go wrong, it will go wrong and i'm the one who knew beforehand.")
                        setHatModalTitle("Explanation - Black")
                        setHatModalVisible(true)
                        break;
                    case "yellow":
                        setHatModalImage(yellowHat)
                        setHatModalText("I'm the yellow hat! Everything has something to benefit from, even in the future. I'm sure of it, everything has a use.")
                        setHatModalTitle("Explanation - Yellow")
                        setHatModalVisible(true)
                        break;
                    case "green":
                        setHatModalImage(greenHat)
                        setHatModalText("The green hat, that's me! I'm open for anything and connect the wildest topics. I present alternatives and new ideas!")
                        setHatModalTitle("Explanation - Green")
                        setHatModalVisible(true)
                        break;
                    default:
                        return;
                }
                
                setHatModalVisible(true)
            }} />
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

            <ImageModal
                title={hatModalTitle ?? ""}
                image={hatModalImage ?? whiteHat}
                text={hatModalText ?? ""}
                visible={hatModalVisible}
                onRequestClose={() => { setHatModalVisible(false); }}
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

            <Text>{timerText}</Text>
 
            <FlatList style={style.list} data={members} renderItem={renderItem} keyExtractor={member => member.id}/>

            <StartSixHatsButton title={sixHatsButtonTitle} spamProtection={true} onPress={() => handleStartStopTool()}/>
            <GoToSurveysButton onPress={() => navigation.navigate("AllSurveysScreen", { userName: members[0].name, surveys: surveys })}/>
        </SafeAreaView>
    )
}
