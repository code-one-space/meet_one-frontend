import {Dimensions} from "react-native";

module.exports = {
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerQrContainer: {
        flex: 0.65,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    outerQrContainer: {
        flex: 0.9,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: Dimensions.get("window").height / 15,
    },
    qr: {

    },
}
