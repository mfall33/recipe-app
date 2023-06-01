import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WHITE, TURQOISE, TURQOISE_OP, BLACK_OP_LIGHT } from "../../Constants/Colors";
import { IMAGE_BASE_URL } from "../../../config";

type CardProps = {
    onPress?: () => () => void;
    title: string;
    image: string;
    subTitle: string;
    bottomText: string;
}

const Card = ({ onPress, title, subTitle, image, bottomText }: CardProps) => {

    let source = require('../../../assets/images/cooking-stock.jpeg');

    if (image) {
        source = { uri: `${IMAGE_BASE_URL}${image}` }
    }

    return (
        <TouchableOpacity style={styles.cont} onPress={onPress}>
            <ImageBackground
                style={styles.imgCont}
                imageStyle={styles.imgContImage}
                resizeMode={"cover"}
                source={source}>
                <View style={styles.innerCont}>
                    <View style={styles.bottomCont}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subTitle}>({subTitle})</Text>
                        <Text style={styles.bottomText}>Made by: <Text style={{ fontStyle: 'normal', fontWeight: '600' }}>{bottomText}</Text></Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cont: {
        marginBottom: 5, paddingHorizontal: 10, paddingTop: 10, borderRadius: 15, flex: 1
    },
    imgCont: {
        height: 250
    },
    imgContImage: {
        borderRadius: 15
    },
    innerCont: {
        backgroundColor: BLACK_OP_LIGHT,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        borderRadius: 15
    },
    bottomCont: {
        backgroundColor: TURQOISE_OP, padding: 10, borderTopWidth: 2, borderColor: TURQOISE, borderBottomLeftRadius: 15, borderBottomEndRadius: 15
    },
    title: {
        fontSize: 20, fontWeight: '500', color: WHITE
    },
    subTitle: {
        fontSize: 16, fontWeight: '500', fontStyle: 'italic', color: WHITE
    },
    bottomText: {
        fontSize: 16, fontWeight: '500', fontStyle: 'italic', color: WHITE
    }
});

export default Card;