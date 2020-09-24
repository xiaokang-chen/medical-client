import {StyleSheet} from "react-native";
import {common} from "../../styles";

export default StyleSheet.create({
    item: {
        ...common.screenHeight(52 / 812),
        ...common.screenWidth(360 / 375),
        marginLeft: 15,
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    left: {
        ...common.fontColorSize('#333333', 16)
    },
    right: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        ...common.screenWidth(36),
        ...common.screenHeight(36),
        borderRadius: 5
    },
    icon: {
        ...common.fontColorSize('#C4C8CD', 20),
        marginLeft: 10
    },
    right_text: {
        fontSize: 14
    }
});
