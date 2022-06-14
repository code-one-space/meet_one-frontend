const {Dimensions} = require("react-native");

module.exports = {
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    },
}
