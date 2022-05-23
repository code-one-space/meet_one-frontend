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
    
    try {
        var meeting = await axios.post(joinMeetingUrl, JSON.stringify({
            "meetingId": `${id}`,
            "member": {
                "name": `${memberName}`
            }
        }), { headers: requestHeaders })
        
        meeting = meeting?.data
        console.log(meeting)
        meetingId = id;
    } catch (error) {
        console.log(error)        
    }
}
