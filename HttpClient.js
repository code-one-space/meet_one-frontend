import axios from "axios";
import * as Navigation from "./Navigation";

const baseUrl = "https://sep-nojo-test.azurewebsites.net/api/";
const createMeetingUrl = baseUrl + "meetings/";
const getMeetingUrl = baseUrl + "meetings/";
const joinMeetingUrl = baseUrl + "meetings/join/";
const leaveMeetingUrl = baseUrl + "meetings/leave/";
const listMeetingsUrl = baseUrl + "meetings/";
const requestHeaders = { 'content-type': 'application/json' };

export let meetingId = undefined;
let memberId = undefined;

export async function joinMeeting(id, memberName) {
    await axios.post(joinMeetingUrl, {
            "meetingId": `${id}`,
            "memberName": `${memberName}`
        }, { headers: requestHeaders })
        .then(function (response) {
            console.log(response);
            meetingId = id;
            memberId = response.data.userId;
            Navigation.navigate("MainScreen"); // TODO this is not the purpose of HttpClient -> put this outside
        })
        .catch(function (error) {
            console.log(error);
            alert("Meeting not found!");
        });
}

export async function createMeeting(memberName, meetingName) {
    await axios.post(createMeetingUrl, {
            "meetingName": `${meetingName}`,
            "creatorName": `${memberName}`
        }, { headers: requestHeaders })
        .then(function (response) {
            console.log(response);
            meetingId = response.data._id;
            memberId = response.data.members[0].id;
            Navigation.navigate("MainScreen"); // TODO this is not the purpose of HttpClient -> put this outside
        })
        .catch(function (error) {
            console.log(error);
            alert("An error occurred while creating Meeting!");
        })
}

export async function leaveMeeting() {
    console.log("MeetingId: " + meetingId);
    await axios.post(leaveMeetingUrl, {
        "meetingId": `${meetingId}`,
        "memberId": `${memberId}`,
    }, { headers: requestHeaders })
        .then(function (response) {
            console.log(response);
            meetingId = undefined;
            memberId = undefined;
            Navigation.navigate("StartScreen");
        })
        .catch(function (error) {
            console.log(error);
            alert("An error occurred while leaving Meeting!");
        })
}
