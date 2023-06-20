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
        height: 350,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    imgBackgroundCont: {
        backgroundColor: BLACK_OP_LIGHT,
        padding: 10,
        borderTopColor: WHITE,
        borderTopWidth: 1
    },
    actionBtnCont: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
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
    },
    collectionModalInner: {
        backgroundColor: WHITE,
        width: '100%',
        borderRadius: 10,
        position: 'absolute',
        top: '20%',
        bottom: '20%',
        height: '60%',
        marginVertical: 'auto'
    }
});