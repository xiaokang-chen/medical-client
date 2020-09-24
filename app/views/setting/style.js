import {StyleSheet} from "react-native";
import {common} from "../../styles";

export default styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:10,
        paddingBottom:0,
    },
    // main: {
    //     marginTop: 10
    // },
    article: {
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
    icon: {
        ...common.fontColorSize('#C4C8CD', 20),
        marginLeft: 10
    },
    right_text: {
        ...common.fontColorSize('#BEC2C8', 14)
    },
    gap: {
        height: 30
    }
});