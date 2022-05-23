import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg";
import * as HttpClient from "../../HttpClient"

export default function ShareScreen ({ navigation }) {
    return (
        <View>
            <StatusBar style="auto" />
            <QRCode
                size={300}
                value={"codeone_meetingapp_id:" + HttpClient.meetingId}
            />
        </View>
    )
}
