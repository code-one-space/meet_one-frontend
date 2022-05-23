import axios from "axios";

const baseUrl = "https://sep-nojo-test.azurewebsites.net/api/";
const createMeetingUrl = baseUrl + "meetings/";
const getMeetingUrl = baseUrl + "meetings/";
const joinMeetingUrl = "https://sep-nojo-test.azurewebsites.net/api/meetings/join";
const leaveMeetingUrl = baseUrl + "meetings/leave/";
const listMeetingsUrl = baseUrl + "meetings/";
const requestHeaders = { 'content-type': 'application/json'};

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
        })
        .catch(function (error) {
            console.log(error);
        });
}
