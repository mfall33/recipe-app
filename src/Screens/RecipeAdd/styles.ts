import { StyleSheet } from "react-native";
import { TURQOISE, WHITE } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    cont: {
        padding: 10,
        minHeight: '100%'
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
    pad: {
        padding: 10,
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
    bottomImg: {
        opacity: 0.6
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
    btnCont: {
        backgroundColor: TURQOISE,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
});