import { StyleSheet } from "react-native";
import { WHITE } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    cont: {
        backgroundColor: WHITE
    },
    scrollCont: {
        minHeight: '100%',
        paddingBottom: 140,
        backgroundColor: WHITE
    },
    loader: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    },
    modalInner: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: WHITE,
        borderRadius: 15,
        padding: 20
    },
});