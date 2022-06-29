import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

module.exports = {
    buttonContainer: {
        flexDirection: 'row',
        height: 60,
        width: 0.75 * windowWidth,
        alignItems: 'center',
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 5,
        margin: 5,
    },
    image: {
        alignItems: 'center',
        width:  30,
        height: 30,
        alignSelf: "center",
        justifyContent: 'flex-end',
        position: "absolute",
        right: 15
    },
    text: {
        flex: 0.6,
        alignItems: 'flex-start',
        fontSize: 20,
        fontFamily: "Sen_400Regular"
    },
}
