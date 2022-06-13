import {Dimensions} from "react-native";

module.exports = {
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        width: 255,
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 23,
        borderWidth: 5,
        margin: 5,
    },
    image_container: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: 'flex-end',
        paddingRight: "2%",
        aspectRatio: 1,
    },
    image: {
        alignItems: 'center',
        justifyContent: "center",
        width:  30,
        height: 30,
    },
    text: {
        flex: 0.6,
        alignItems: 'flex-start',
        paddingLeft: "2%",
        paddingRight: "5%",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "300",
        letterSpacing: 0.25,
    },
}
