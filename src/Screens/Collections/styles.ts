import { StyleSheet } from "react-native";
import { TURQOISE, WHITE } from "../../Constants/Colors";

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
});