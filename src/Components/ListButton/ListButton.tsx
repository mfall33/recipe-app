import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WHITE, TURQOISE } from "../../Constants/Colors";

type ButtonProps = {
    onPress?: () => void;
    text: string;
    style?: Object,
}

const ListButton = ({ onPress, text, style }: ButtonProps) => {

    return (
        <TouchableOpacity style={[styles.cont, style]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cont: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: TURQOISE
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: TURQOISE,
    },
});

export default ListButton;