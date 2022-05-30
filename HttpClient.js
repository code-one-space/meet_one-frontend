import axios from "axios";
import * as Navigation from "./Navigation";

const baseUrl = "https://sep-nojo-test.azurewebsites.net/api/";
const createMeetingUrl = baseUrl + "meetings/";
const getMeetingUrl = baseUrl + "meetings/";
const joinMeetingUrl = baseUrl + "meetings/join/";
const leaveMeetingUrl = baseUrl + "meetings/leave/";
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
        Navigation.navigate("MainScreen"); // TODO this is not the purpose of HttpClient -> put this outside
    } catch (error) {
        console.log(error);
        alert("Meeting not found!");
    }
}

export async function createMeeting(memberName, meetingName) {
    console.log(memberName);
    let body = JSON.stringify({
        meetingName: meetingName,
        creatorName: memberName
    });

    try {
        let response = await axios.post(createMeetingUrl, body, { headers: requestHeaders });
        meetingId = response.data._id;
        memberId = response.data.memberId;
        Navigation.navigate("MainScreen"); // TODO this is not the purpose of HttpClient -> put this outside
    } catch (error) {
        console.log(error);
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
        console.log(error);
        alert("An error occurred while leaving Meeting!");
    }
}

export async function getAllMembers() {
    try {
        let response = await axios.get(getMeetingUrl + `${meetingId}`, { headers: requestHeaders });
        return response.data.members; // TODO remove "" from keys in this
    } catch (error) {
        console.log(error);
        alert("An error occurred while fetching Meeting!");
    }
}
