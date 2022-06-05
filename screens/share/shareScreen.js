import {View, SafeAreaView, Share} from "react-native";
import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg";
import * as HttpClient from "../../shared/httpClient/httpClient"
import styles from "./shareScreen.style";
import { Button } from "@@components";

export default function ShareScreen ({ navigation }) {
    const handleShareLink = async () => {
        try {
            await Share.share({ message: "This is the share message" });
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
