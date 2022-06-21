const {Dimensions} = require("react-native");

export default {
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    },
}
