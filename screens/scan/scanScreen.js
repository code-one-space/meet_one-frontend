import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { InfoModal } from "@@components"
import styles from "./scanScreen.style";
import * as HttpClient from "../../shared/httpClient/httpClient";

export default function ScanScreen ({ navigation, route }) {
    let { personName } = route.params;

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [visible, setVisible] = useState(false);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({type, data}) => {

        if(joined)
            return;

        let meetingId = data.split("codeone_meetingapp_id:")[1];
        
        // check if QR-Code is working with our app
        if (meetingId) {
            setJoined(true)
            await HttpClient.joinMeeting(meetingId, personName);
            setScanned(true);
            setVisible(false);
        } else {
            setVisible(true);
            setScanned(true);

            // wait for a small delay before scanning again
            // creates error, can be ignored
            setTimeout(() => { setScanned(false); }, 1500) 
        }
    };

    if (hasPermission === null)
        return (<Text>Requesting for camera permission</Text>);
    if (hasPermission === false)
        return (<Text>No access to camera</Text>);
    
    return (
        <SafeAreaView>
            <InfoModal 
                title={"Invalid QR-Code"}
                visible={visible}
                onRequestClose={() => setVisible(false)}
                text={"The scanned QR-Code doesn't contain a valid Meet:One join code"} />
            <StatusBar style="auto" />
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned }
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        </SafeAreaView>
    )
}
