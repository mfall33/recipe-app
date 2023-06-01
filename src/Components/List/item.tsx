import { TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { YELLOW, WHITE, TURQOISE } from '../../Constants/Colors';

interface ItemProps {
    item: any,
    callback?: (item: any) => void,
    closeCallback?: (item: any) => void,
    itemDisplayKey: string
}

const Item = ({ item, callback, closeCallback, itemDisplayKey }: ItemProps) => {

    return (
        <TouchableOpacity style={styles.list} onPress={(e) => callback && callback(item)}>
            <Text style={styles.text}>{item[itemDisplayKey]}</Text>
            {closeCallback &&
                <TouchableOpacity
                    style={styles.delete}
                    onPress={(e) => closeCallback && closeCallback(item)}>
                    <Text style={styles.deleteInner}>X</Text>
                </TouchableOpacity>
            }
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: TURQOISE,
        backgroundColor: WHITE
    },
    text: {
        fontWeight: '500',
        fontSize: 20,
        color: TURQOISE
    },
    delete: {
        backgroundColor: WHITE,
        borderColor: TURQOISE,
        borderWidth: 1,
        padding: 15,
        borderRadius: 30,
    },
    deleteInner: {
        fontSize: 20,
        fontWeight: '500',
        color: TURQOISE
    }
});

export default Item;