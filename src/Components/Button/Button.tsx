import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WHITE, TURQOISE } from "../../Constants/Colors";

type ButtonProps = {
    onPress?: () => void;
    text: string;
    style?: Object,
    disabled?: Boolean
}

const Button = ({ onPress, text, style, disabled }: ButtonProps) => {

    return (
        <TouchableOpacity style={[styles.cont, style, { opacity: disabled ? 0.75 : 1 }]} onPress={onPress}>
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
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: WHITE,
    },
});

export default Button;