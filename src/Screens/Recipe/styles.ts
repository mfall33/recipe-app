import { StyleSheet } from "react-native";
import { TURQOISE, TURQOISE_OP, WHITE, YELLOW } from "../../Constants/Colors";

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
        width: 180, height: 180
    },
    topImgCont: {
    },
    topImgContCont: {
        paddingLeft: 20,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        borderColor: TURQOISE
    },
    bottomImg: {
        opacity: 0.6
    },
    imgSelectBtnCont: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: TURQOISE,
        marginTop: 10,
        paddingBottom: 20
    },
    imgSelectBtn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
        height: 150,
        borderRadius: 15,
        borderColor: TURQOISE,
        borderWidth: 1,
        marginTop: 10
    },
    imgSelectPlus: {
        fontSize: 45,
        textAlign: 'center',
        color: TURQOISE
    },
    imgSelectText: {
        fontSize: 25,
        textAlign: 'center',
        color: TURQOISE,
        fontStyle: 'italic'
    },
    btnCont: {
        backgroundColor: TURQOISE_OP,
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
    }
});