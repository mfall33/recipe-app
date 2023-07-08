import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TitleSm } from "..";
import { TURQOISE, TURQOISE_OP } from "../../Constants/Colors";


type ListItemProps = {
    title: string,
    subTitleOne: string,
    subTitleTwo?: string,
    onPress?: () => void,
    onDotsPress?: () => void
}

const ListItem = ({ title, subTitleOne, subTitleTwo, onPress, onDotsPress }: ListItemProps) => {

    return (
        <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: TURQOISE }} onPress={onPress}>

            {!onDotsPress &&
                <TouchableOpacity onPress={onDotsPress}>
                    <Image
                        style={styles.dotsImage}
                        source={require('../../../assets/images/Icons/Dots.png')}
                    />
                </TouchableOpacity>
            }
            <TitleSm style={{ color: TURQOISE }}>{title}</TitleSm>
            <Text>{subTitleOne}</Text>
            {subTitleTwo &&
                <Text>{subTitleTwo}</Text>
            }
        </TouchableOpacity>
    );

}

export default ListItem;

const styles = StyleSheet.create({
    dotsImage: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 20,
        height: 20,
        tintColor: TURQOISE_OP
    }
});