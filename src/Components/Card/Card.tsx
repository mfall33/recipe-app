import moment from 'moment';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WHITE, TURQOISE, TURQOISE_OP, BLACK_OP_LIGHT } from "../../Constants/Colors";
import { IMAGE_BASE_URL } from "../../../config";

type CardProps = {
    onPress?: () => void;
    onDeletePress?: () => void;
    onLikePress?: () => void;
    title: string;
    image: string;
    subTitle: string;
    createdAt: any;
    bottomText: string;
}

const Card = ({ title, subTitle, image, bottomText, createdAt, onPress, onDeletePress, onLikePress }: CardProps) => {

    let source = require('../../../assets/images/cooking-stock.jpeg');

    if (image) {
        source = { uri: `${IMAGE_BASE_URL}${image}` }
    }

    const duration = moment.duration(moment().diff(createdAt));

    const timeAgo = () => {
        if (duration.asSeconds() < 60) {
            return `${Math.floor(duration.asSeconds())} seconds ago`;
        } else if (duration.asMinutes() < 60) {
            return `${Math.floor(duration.asMinutes())} minutes ago`;
        } else if (duration.asHours() < 24) {
            return `${Math.floor(duration.asHours())} hours ago`;
        } else if (duration.asDays() < 365) {
            return `${Math.floor(duration.asDays())} days ago`;
        } else {
            return `${Math.floor(duration.asYears())} years ago`;
        }
    };

    return (
        <TouchableOpacity style={styles.cont} onPress={onPress}>
            <ImageBackground
                style={styles.imgCont}
                imageStyle={styles.imgContImage}
                resizeMode={"cover"}
                source={source}>

                <View style={styles.innerCont}>
                {onDeletePress &&
                        <TouchableOpacity style={styles.deleteBtnCont} onPress={onDeletePress}>
                            <Image style={styles.deleteBtnIcon} source={require('../../../assets/images/Icons/Delete.png')} />
                        </TouchableOpacity>
                    }
                    
                    {onLikePress &&
                        <TouchableOpacity style={styles.deleteBtnCont} onPress={onLikePress}>
                            <Image style={styles.deleteBtnIcon} source={require('../../../assets/images/Icons/Heart-Empty.png')} />
                        </TouchableOpacity>
                    }
                    
                    <View style={styles.bottomCont}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subTitle}>{subTitle}</Text>
                        <Text style={styles.bottomText}>Made by: <Text style={{ fontStyle: 'italic', fontWeight: '600' }}>{bottomText}</Text></Text>
                        <Text style={styles.bottomText}>{timeAgo()}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cont: {
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 15,
        flex: 1
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
        backgroundColor: TURQOISE_OP,
        padding: 10,
        borderTopWidth: 2,
        borderColor: TURQOISE,
        borderBottomLeftRadius: 15,
        borderBottomEndRadius: 15
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: WHITE
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'italic',
        color: WHITE
    },
    bottomText: {
        fontSize: 16,
        fontWeight: '500',
        color: WHITE
    },
    deleteBtnCont: {
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        padding: 5,
        backgroundColor: TURQOISE_OP,
        borderRadius: 10,
        borderColor: WHITE,
        borderWidth: 1,
        position: 'absolute'
    },
    deleteBtnIcon: {
        tintColor: WHITE,
        width: '100%',
        height: '100%'
    }
});

export default Card;