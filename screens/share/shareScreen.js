import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import QRCode from "react-native-qrcode-svg";
import * as HttpClient from "../../HttpClient"
import styles from "./shareScreen.style";

export default function ShareScreen ({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.outerQrContainer}>
                <View style={styles.innerQrContainer}>
                    <QRCode
                        size={300}
                        value={"codeone_meetingapp_id:" + HttpClient.meetingId}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
