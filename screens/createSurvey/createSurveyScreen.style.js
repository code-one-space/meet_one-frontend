import {StyleSheet} from "react-native";

module.exports = {
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
    },
    textInput: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        borderWidth: 1,
        marginVertical: 15,
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: "black",
        backgroundColor: "white",
        fontFamily: "Sen_700Bold",
        minWidth: "80%",
        maxWidth: "80%",
        height: 60,
    },
    separator: {
        marginTop: 6,
        marginBottom: 12,
        height: 10,
        width: "95%",
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    choicesHeader: {
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 10,
    },
    choicesHeaderText: {
        marginLeft: 5,
        width: "83%",
        fontFamily: "Sen_700Bold",
        fontSize: 30,
    },
    button: {
        marginBottom: 10,
        marginTop: 10,
    },
    list: {
        width: "95%",
    }
}