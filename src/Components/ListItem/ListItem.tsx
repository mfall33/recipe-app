import { Text, TouchableOpacity } from "react-native";
import { TitleSm } from "..";
import { TURQOISE } from "../../Constants/Colors";


type ListItemProps = {
    title: string,
    subTitleOne: string,
    subTitleTwo?: string,
    onPress?: () => void
}

const ListItem = ({ title, subTitleOne, subTitleTwo, onPress }: ListItemProps) => {

    return (
        <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: TURQOISE }} onPress={onPress}>
            <TitleSm style={{ color: TURQOISE }}>{title}</TitleSm>
            <Text>{subTitleOne}</Text>
            {subTitleTwo &&
                <Text>{subTitleTwo}</Text>
            }
        </TouchableOpacity>
    );

}

export default ListItem;