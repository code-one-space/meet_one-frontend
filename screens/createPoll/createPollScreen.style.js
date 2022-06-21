import {StyleSheet} from "react-native";

module.exports = {
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        flex: 0.1,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        borderWidth: 1,
        marginTop: 10,
        fontSize: 20,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: "black",
        backgroundColor: "white",
        fontFamily: "Sen_700Bold",
        minWidth: "80%",
        maxWidth: "80%",
        minHeight: 40,
        maxHeight: 60
    },
    separator: {
        marginTop: 10,
        marginBottom: 10,
        height: 10,
        width: "90%",
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    listItem: {

    },
    button: {
        marginBottom: 10,
    },
    list: {
        width: "95%",
    }
}