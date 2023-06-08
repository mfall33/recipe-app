import { StyleSheet } from "react-native";
import { BLACK_OP_LIGHT, TURQOISE, WHITE } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    mainCont: {
        height: '100%',
        paddingVertical: 0
    },
    pad: {
        padding: 10,
    },
    cont: {
        minHeight: '100%',
    },
    title: {
        textAlign: 'center',
        color: TURQOISE
    },
    duration: {
        fontStyle: 'italic',
        textAlign: 'center',
        color: TURQOISE
    },
    topImg: {
        width: 180,
        height: 180
    },
    topImgContCont: {
        paddingLeft: 20,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        borderColor: TURQOISE
    },
    bottomImg: {
        opacity: 0.6
    },
    btnCont: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    modalInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalImg: {
        height: 320,
        width: 320,
        backgroundColor: WHITE,
        borderRadius: 10
    },
    imgBackground: {
        height: 250,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    imgBackgroundCont: {
        backgroundColor: BLACK_OP_LIGHT,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center'
    },
    whiteAndItalic: {
        color: WHITE,
        fontStyle: 'italic'
    },
    actionBtnCont: {
        display: 'flex',
        flexDirection: 'row'
    },
    actionBtn: {
        borderWidth: 1,
        marginLeft: 10,
        borderRadius: 50,
        borderColor: TURQOISE,
        padding: 10,
    },
    actionBtnImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: WHITE
    }
});