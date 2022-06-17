import {View, SafeAreaView, Share} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import QRCode from "react-native-qrcode-svg";
import * as HttpClient from "../../shared/httpClient/httpClient"
import styles from "./shareScreen.style";
import { Button } from "@@components";

export default function ShareScreen ({ navigation }) {
    const handleShareLink = async () => {
        try {
            let link = `https://codeone.space/meetone/join?meetingId=${HttpClient.meetingId}`; // Linking.createURL("", { queryParams: { meetingId: HttpClient.meetingId }});
            await Share.share({ message: "Join my Meeting by clicking on this Link:\n" + link });
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.qrContainer}>
                <QRCode
                    size={250}
                    value={"codeone_meetingapp_id:" + HttpClient.meetingId}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title={"Share Link"} white={true} onPress={handleShareLink}/>
            </View>
        </SafeAreaView>
    )
}
