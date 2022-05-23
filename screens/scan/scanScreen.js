import {Text, View, SafeAreaView, StyleSheet, Dimensions} from "react-native";
import { StatusBar } from "expo-status-bar";
import {useEffect, useState} from "react";
import {BarCodeScanner} from "expo-barcode-scanner";
import styles from "./scanScreen.style";
import {Button} from "react-native";

export default function ScanScreen ({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null)
        return (<Text>Requesting for camera permission</Text>);
    if (hasPermission === false)
        return (<Text>No access to camera</Text>);


    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </SafeAreaView>
    )
}
