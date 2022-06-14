import {Dimensions} from "react-native";

module.exports = {
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrContainer: {
        flex: 0.7,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: Dimensions.get("window").height / 15,
        marginTop: "10%",
    },
    buttonContainer: {
        flex: 0.2,
        width: "65%",
        justifyContent: "center",
        alignItems: "center",
    }
}
