import axios from "axios";
import * as Navigation from "../navigation/navigation";

const baseUrl = "https://sep-nojo-test.azurewebsites.net/api/";
const createMeetingUrl = baseUrl + "meetings/";
const getMeetingUrl = baseUrl + "meetings/";
const joinMeetingUrl = baseUrl + "meetings/join/";
const leaveMeetingUrl = baseUrl + "meetings/leave/";

const startToolUrl = baseUrl + "tools/"
const quitToolUrl = baseUrl + "tools/quit/"

const createNotificationUrl = baseUrl + "notifications/"

const requestHeaders = { 'content-type': 'application/json' };

export let meetingId = undefined;
let memberId = undefined;

export async function joinMeeting(id, memberName) {
    let body = JSON.stringify({
        meetingId: id,
        memberName: memberName
    });

    try {
        let response = await axios.post(joinMeetingUrl, body, { headers: requestHeaders });
        meetingId = id;
        memberId = response.data.memberId;
        Navigation.navigate("MainScreen", { memberName: memberName }); // TODO this is not the purpose of HttpClient -> put this outside
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
        Navigation.navigate("MainScreen", { memberName: memberName }); // TODO this is not the purpose of HttpClient -> put this outside
    } catch (error) {
        console.log(error.response);
        alert("An error occurred while creating Meeting!");
    }
}

export async function leaveMeeting() {
    let body = JSON.stringify({
        meetingId: meetingId,
        memberId: memberId,
    });

    try {
        await axios.post(leaveMeetingUrl, body, { headers: requestHeaders });
        meetingId = undefined;
        memberId = undefined;
        Navigation.navigate("StartScreen");
    } catch (error) {
        console.error(error);
        alert("An error occurred while leaving Meeting!");
    }
}

export async function getMeetingInformation() {
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
        let response = await axios.post(startToolUrl, body, { headers: requestHeaders });
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
        let response = await axios.post(quitToolUrl, body, { headers: requestHeaders });
        return response.data
    } catch (error) {
        console.error(error);
        alert("An error occurred while quitting tool!");
    }
}

export async function createNotification(message, receiverId) {
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
