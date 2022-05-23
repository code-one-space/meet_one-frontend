import axios from "axios";
import * as Navigation from "./Navigation";

const baseUrl = "https://sep-nojo-test.azurewebsites.net/api/";
const createMeetingUrl = baseUrl + "meetings/";
const getMeetingUrl = baseUrl + "meetings/";
const joinMeetingUrl = baseUrl + "meetings/join";
const leaveMeetingUrl = baseUrl + "meetings/leave/";
const listMeetingsUrl = baseUrl + "meetings/";
const requestHeaders = { 'content-type': 'application/json' };

export let meetingId = "628b963979b7fbe3cf23b0a6";

export async function joinMeeting(id, memberName) {
    await axios.post(joinMeetingUrl, {
            "meetingId": `${id}`,
            "member": {
                "name": `${memberName}`
            }
        }, { headers: requestHeaders })
        .then(function (response) {
            console.log(response);
            meetingId = id;
            Navigation.navigate("MainScreen"); // TODO this is not the purpose of HttpClient -> put this outside
        })
        .catch(function (error) {
            console.log(error);
            alert("Meeting not found!");
        });
}

export async function createMeeting(memberName, meetingName) {
    await axios.post(createMeetingUrl, {
            "name": `${meetingName}`,
            "owner": {
                "name": `${memberName}`
            }
        }, { headers: requestHeaders })
        .then(function (response) {
            console.log(response);
            meetingId = response.data._id;
            Navigation.navigate("MainScreen"); // TODO this is not the purpose of HttpClient -> put this outside
        })
        .catch(function (error) {
            console.log(error);
            alert("An error occurred while creating Meeting!");
        })
}
