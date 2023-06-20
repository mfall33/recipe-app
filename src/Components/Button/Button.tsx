import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WHITE, TURQOISE, BLACK_OP_HEAVY, BLACK } from "../../Constants/Colors";

type ButtonProps = {
    onPress?: () => void;
    text: string;
    style?: Object,
    disabled?: Boolean
}



const Button = ({ onPress, text, style, disabled = false }: ButtonProps) => {

    const handlePress = () => {
        if (!disabled) {
            onPress();
        }
    };

    return (
        <TouchableOpacity activeOpacity={disabled ? .99 : .2}  style={[styles.cont, style, { opacity: disabled ? 0.75 : 1 }]} onPress={handlePress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cont: {
        marginTop: 20,
        borderRadius: 30,
        borderColor: TURQOISE,
        borderWidth: 2,
        padding: 10,
        backgroundColor: TURQOISE,
        shadowColor: BLACK,
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: WHITE,
    },
});

export default Button;