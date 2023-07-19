import { StyleSheet } from "react-native";
import { BLACK_OP_LIGHT, TURQOISE, WHITE } from "../../Constants/Colors";

export const styles = StyleSheet.create({
    cont: {
        height: '100%',
        paddingVertical: 0
    },
    title: {
        color: TURQOISE
    },
    pad: {
        padding: 10,
    },
    btnCont: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    inputCont: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        paddingRight: 5
    }
});