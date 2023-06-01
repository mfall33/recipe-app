import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TURQOISE, TURQOISE_OP, WHITE } from "../../Constants/Colors";

type PlusButtonProps = {
    onPress?: () => void
}

const PlusButton = ({ onPress }: PlusButtonProps) => {

    return (
        <TouchableOpacity style={styles.cont} onPress={onPress}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cont: {
        position: 'absolute',
        zIndex: 999,
        top: '75%',
        right: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: TURQOISE_OP,
        borderColor: WHITE,
        borderWidth: 2,
        width: 60,
        height: 60,
    },
    plus: {
        fontSize: 30,
        fontWeight: '500',
        lineHeight: 30,
        color: WHITE,
    },
});

export default PlusButton;