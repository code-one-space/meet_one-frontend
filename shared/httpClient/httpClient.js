import axios from "axios";
import * as Navigation from "../navigation/navigation";

const baseUrl = "https://sep-nojo-test.azurewebsites.net/api/";
const createMeetingUrl = baseUrl + "meetings/";
const getMeetingUrl = baseUrl + "meetings/";
const joinMeetingUrl = baseUrl + "meetings/join/";
const leaveMeetingUrl = baseUrl + "meetings/leave/";

const startSixhatsUrl = baseUrl + "sixhats/start/"
const quitSixhatsUrl = baseUrl + "sixhats/stop/"

const createNotificationUrl = baseUrl + "notifications/"
const deleteNotificationUrl = baseUrl + "notifications/delete/";

const createSurveyUrl = baseUrl + "surveys/";

const requestHeaders = { 'content-type': 'application/json' };

export let meetingId = undefined;
export let memberId = undefined;

export async function joinMeeting(id, memberName) {
    let body = JSON.stringify({
        meetingId: id,
        memberName: memberName
    });

    try {
        let response = await axios.post(joinMeetingUrl, body, { headers: requestHeaders });
        meetingId = id;
        memberId = response?.data?.memberId;
        // TODO this is not the purpose of HttpClient -> put this outside
        Navigation.navigate("MainScreen", { memberName: memberName, meetingId: meetingId });
    } catch (error) {
        console.error(error);
        alert("Meeting not found!");
    }
}

export async function createMeeting(memberName) {
    let meetingName = "I am useless.";

    let body = JSON.stringify({
        meetingName: meetingName,
        creatorName: memberName
    });

    try {
        let response = await axios.post(createMeetingUrl, body, { headers: requestHeaders });
        meetingId = response.data._id;
        memberId = response.data.memberId;

        // TODO this is not the purpose of HttpClient -> put this outside
        Navigation.navigate("MainScreen", { memberName: memberName, meetingId: meetingId });
    } catch (error) {
        console.log(error.response);
        alert("An error occurred while creating Meeting!");
    }
}

export async function leaveMeeting(followingScreen, config, interval) {
    let body = JSON.stringify({
        meetingId: meetingId,
        memberId: memberId
    });

    try {
        axios.post(leaveMeetingUrl, body, { headers: requestHeaders });
        meetingId = undefined;
        memberId = undefined;
        Navigation.navigate(followingScreen ?? "StartScreen", config);
    } catch (error) {
        console.error(error);
        // alert("An error occurred while leaving Meeting!");

        // clear all intervals
        // work around: if connection is slow and request fails interval should be stopped
        // TODO: fix problems
        let currentId = setInterval(() => {}, 1000)
        for(i = 0; i < currentId; i++) {
            clearInterval(i)
        }
    }
}

export async function getMeetingInformation() {
    if(!meetingId)
        return
    try {
        let response = await axios.get(getMeetingUrl + `${meetingId}`, { headers: requestHeaders });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching Meeting!");
    }
}

export async function startTool() {
    let body = JSON.stringify({
        meetingId: meetingId,
    });

    try {
        let response = await axios.post(startSixhatsUrl, body, { headers: requestHeaders });
        return response.data;
    } catch (error) {
        console.error(error);
        alert("An error occurred while starting tool!");
    }
}

export async function quitTool() {
    let body = JSON.stringify( {
        meetingId: meetingId,
    });

    try {
        let response = await axios.post(quitSixhatsUrl, body, { headers: requestHeaders });
        return response.data
    } catch (error) {
        console.error(error);
        alert("An error occurred while quitting tool!");
    }
}

export async function createNotification(receiverId, message) {
    let body = JSON.stringify({
        meetingId: meetingId,
        receiverId: receiverId,
        message: message,
    })

    try {
        await axios.post(createNotificationUrl, body, { headers: requestHeaders });
    } catch (error) {
        console.error(error);
        alert("An error occurred while creating notification!");
    }
}

export async function deleteNotification(notificationId) {
    let body = JSON.stringify({
        meetingId: meetingId,
        receiverId: memberId,
        notificationId: notificationId,
    })

    try {
        await axios.post(deleteNotificationUrl, body, { headers: requestHeaders });
    } catch (error) {
        console.error(error);
        alert("An error occured while deleting notification!");
    }
}

export async function createSurvey(question, creatorName, choices) {
    let body = JSON.stringify({
        meetingId: meetingId,
        creatorName: creatorName,
        question: question,
        choices: choices
    })

    console.log("body: " + body);

    try {
        await axios.post(createSurveyUrl, body, { headers: requestHeaders });
        Navigation.navigate("MainScreen", { meetingId: meetingId });
    } catch (error) {
        console.error(error);
        alert("An error occured while creating survey");
    }
}
