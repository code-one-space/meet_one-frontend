import {Text, View, SafeAreaView, StyleSheet, Button} from "react-native";
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

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({type, data}) => {
        let meetingId = data.split("codeone_meetingapp_id:")[1];
        
        // check if QR-Code is working with our app
        if (!!meetingId) {
            await HttpClient.joinMeeting(meetingId, personName);
            setScanned(true);
            setVisible(false);
        } else {
            setVisible(true);
            setScanned(false);
            alert('Wrong QR-Code!');
        }
    };

    if (hasPermission === null)
        return (<Text>Requesting for camera permission</Text>);
    if (hasPermission === false)
        return (<Text>No access to camera</Text>);
    
    console.log("meow"+ InfoModal)

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <InfoModal 
                    // text={"Hello, World!"}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                    title={"Something"} />
                {/* <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                /> */}
            </View>
        </SafeAreaView>
    )
}
