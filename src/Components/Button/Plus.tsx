import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { BLACK, TURQOISE_OP, WHITE } from "../../Constants/Colors";

type PlusButtonProps = {
    onPress?: () => void
}

const PlusButton = ({ onPress }: PlusButtonProps) => {

    return (
        <TouchableOpacity style={styles.cont} onPress={onPress}>
            <Image style={styles.plus} source={require('../../../assets/images/Icons/Plus.png')} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cont: {
        position: 'absolute',
        zIndex: 999,
        top: '77%',
        right: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: TURQOISE_OP,
        borderColor: WHITE,
        borderWidth: 2,
        padding: 15,
        width: 60,
        height: 60,
        shadowColor: BLACK,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    plus: {
        width: '100%',
        height: '100%',
        tintColor: WHITE
    },
});

export default PlusButton;