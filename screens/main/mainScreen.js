import { SafeAreaView, Vibration, BackHandler, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SelectNotificationButton, InfoModal, TeamListItem, StartSixHatsButton, IconButton, ImageModal, ChoiceModal, TimerButton, TimerModal } from "@@components";
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

export default function MainScreen({ navigation, route }) {
    BackHandler.addEventListener('hardwareBackPress', HardwareBackButtonHandler.handleBackButton); // ConfirmScreen needs to be called on leave

    const { meetingId } = route.params;

    // meeting
    let [id, setMeetingId] = useState(meetingId);

    // timer
    let [timerText, setTimerText] = useState("00:00:00");
    let [timerInput, setTimerInput] = useState("00:00:00");
    let [timerModalVisible, setTimerModalVisible] = useState(false);

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
            require('@@assets/notification/notification.mp3')
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
    const [members, setMembers] = useState([
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

                let members = [...data.members].sort(memberSorter)

                // set data to state vars
                setMembers(members);
                setTool(data.currentTool);
                setSixHatsButtonTitle(data.currentTool == "" ? "Start Six Hats" : "Stop Six Hats");

                if (data?.timer.time > 0 && data?.timer.time > Date.now()) {
                    const interval = setInterval(() => {
                        let date = new Date(data.timer.time - Date.now())
                        if (date.getTime() > 0) { // stop interval after 00:00:00
                            let hours = ("" + date.getUTCHours()).padStart(2, '0')
                            let minutes = ("" + date.getUTCMinutes()).padStart(2, '0')
                            let seconds = ("" + date.getUTCSeconds()).padStart(2, '0')
                            setTimerText(`${hours}:${minutes}:${seconds}`)
                        }
                    }, 1000)
                    setTimeout(() => clearInterval(interval), 2100) // 2100 -> try and error
                } else
                    setTimerText("00:00:00")

                let notifications = data?.members.filter(member => member?.id == HttpClient.memberId)[0]?.notifications;
                if (!!notifications) {
                    for (let notification of notifications) {
                        setNotificationMessage(notification?.message ?? "")
                        setNotificationVisible(true)
                        playSound()
                        const interval = setInterval(() => Vibration.vibrate(), 1000) // vibrate every second
                        setTimeout(() => clearInterval(interval), 3100) // stop vibrating after 3.1s
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
    }, [id]);

    const handleOpenSendNotificationPopUp = (member) => {
        setNotificationReceiver(member);
        setSelectNotificationVisible(true);
    }

    const handleSendNotification = (message) => {
        HttpClient.createNotification(notificationReceiver.id, message);
        setSelectNotificationVisible(!selectNotificationVisible);
    }

    const handleStartTimer = () => {
        setTimerModalVisible(false)
        let time = convertTimestampToTime(timerInput)
        HttpClient.startTimer(time)
    }

    const convertTimestampToTime = (data) => {
        if(!data)
            return
        data = data.split(":")

        if(data.length <= 1) {
            return new Date(Date.now() + ((+data[0]) * 1000)).getTime()
        } else if(data.length <= 2) {
            return new Date(Date.now() + ((+data[0]) * 60 * 1000) + ((+data[1]) * 1000)).getTime()
        } else if(data.length <= 3) {
            return new Date(Date.now() + ((+data[0]) * 60 * 60 * 1000) + ((+data[1]) * 60 * 1000) + ((+data[2]) * 1000)).getTime()
        }
    }

    const handleStopTimer = () => {
        HttpClient.stopTimer()
    }

    function memberSorter (memberA, memberB) {
        if (memberA.id == HttpClient.memberId)
            return -1;
        if (memberB.id == HttpClient.memberId)
            return 1;
        return memberA.name.toLowerCase().localeCompare(memberB.name.toLowerCase());
    }

    let handleStartStopTool = () => {
        if (tool == "") {
            HttpClient.startTool().then(data => {
                setTool(data.currentTool);
                setMembers([...data?.members].sort(memberSorter));
                setSixHatsButtonTitle("Stop Six Hats");
            }).catch(console.error)
        } else {
            HttpClient.quitTool().then(data => {
                setTool("");
                setMembers([...data?.members].sort(memberSorter));
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

                if (!item?.hat || item?.hat == "")
                    return;

                switch (item?.hat) {
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
                onRequestClose={() => { setHatModalVisible(false); }} />

            <TimerModal
                visible={timerModalVisible}
                value={timerInput}
                setTimerInput={setTimerInput}
                handleStartTimer={handleStartTimer}
                handleStopTimer={handleStopTimer}
                onRequestClose={() => { setTimerModalVisible(false) }}
            />

            <ChoiceModal
                onRequestClose={() => { setSelectNotificationVisible(false) }}
                title={notificationReceiver?.name}
                visible={selectNotificationVisible}
                choices={[
                    <SelectNotificationButton key={1} title={"Come on, time's up!"} white={true} onPress={() => handleSendNotification("Come on, time's up!")} />,
                    <SelectNotificationButton key={2} title={"Can I ask a question?"} white={true} onPress={() => handleSendNotification("Can I ask a question?")} />,
                    <SelectNotificationButton key={3} title={"Can you repeat that?"} white={true} onPress={() => handleSendNotification("Can you repeat that?")} />,
                    <SelectNotificationButton key={3} title={"A bit slower please"} white={true} onPress={() => handleSendNotification("A bit slower please")} />
                ]} />
            <StatusBar style="auto" />

            <TimerButton onPress={() => { setTimerModalVisible(true) }} time={timerText} />
            <FlatList style={style.list} data={members} renderItem={renderItem} keyExtractor={member => member.id} />

            <StartSixHatsButton title={sixHatsButtonTitle} spamProtection={true} onPress={() => handleStartStopTool()} />
            <IconButton iconName={"edit"} text={"Surveys"} buttonStyle={{ paddingLeft: 30 }} textStyle={{ paddingLeft: 15 }} onPress={() => navigation.navigate("AllSurveysScreen", { userName: members[0].name, surveys: surveys })} />
        </SafeAreaView>
    )
}
