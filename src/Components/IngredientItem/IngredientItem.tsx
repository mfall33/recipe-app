import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WHITE, TURQOISE_OP } from "../../Constants/Colors";

type ButtonProps = {
    onDeletePress?: () => void;
    text: string;
    enableDelete: boolean;
}

const IngredientItem = ({ onDeletePress, text, enableDelete = true }: ButtonProps) => {

    return (
        <View style={styles.cont}>
            <Text
                style={styles.text}>{text}</Text>
            {enableDelete &&
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={onDeletePress}
                >
                    <Image source={require('../../../assets/images/Icons/Close.png')} style={styles.img} />
                </TouchableOpacity>
            }
        </View>);

}

const styles = StyleSheet.create({
    cont: {
        backgroundColor: TURQOISE_OP,
        borderColor: TURQOISE_OP,
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontWeight: '600',
        color: WHITE,
    },
    deleteBtn: {
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: 15,
        padding: 5
    },
    img: {
        width: 15,
        height: 15,
        tintColor: WHITE
    }
});

export default IngredientItem;