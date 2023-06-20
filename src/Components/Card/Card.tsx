import moment from 'moment';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WHITE, TURQOISE, TURQOISE_OP, BLACK_OP_LIGHT } from "../../Constants/Colors";
import { IMAGE_BASE_URL } from "../../../config";

type CardProps = {
    onPress?: () => void;
    onDeletePress?: () => void;
    onAddPress?: () => void;
    onLikePress?: () => void;
    onCollectionDeletePress?: () => void;
    title: string;
    image: string;
    subTitle: string;
    createdAt: any;
    liked: boolean
    bottomText: string;
}

const Card = ({
    title,
    subTitle,
    image,
    bottomText,
    createdAt,
    liked = false,
    onPress,
    onAddPress,
    onDeletePress,
    onLikePress,
    onCollectionDeletePress
}: CardProps) => {

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

                    <View style={styles.iconCont}>

                        {onAddPress &&
                            <TouchableOpacity style={styles.deleteBtnCont} onPress={onAddPress}>
                                <Image style={styles.deleteBtnIcon} source={require('../../../assets/images/Icons/Add-Collection.png')} />
                            </TouchableOpacity>
                        }
                        
                        {onCollectionDeletePress &&
                            <TouchableOpacity style={styles.deleteBtnCont} onPress={onCollectionDeletePress}>
                                <Image style={styles.deleteBtnIcon} source={require('../../../assets/images/Icons/Delete-Collection.png')} />
                            </TouchableOpacity>
                        }

                        {onDeletePress &&
                            <TouchableOpacity style={styles.deleteBtnCont} onPress={onDeletePress}>
                                <Image style={styles.deleteBtnIcon} source={require('../../../assets/images/Icons/Delete.png')} />
                            </TouchableOpacity>
                        }


                        {onLikePress &&
                            <TouchableOpacity style={styles.deleteBtnCont} onPress={onLikePress}>
                                <Image style={styles.deleteBtnIcon} source={liked ? require('../../../assets/images/Icons/Heart-Full.png') : require('../../../assets/images/Icons/Heart-Empty.png')} />
                            </TouchableOpacity>
                        }
                    </View>


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
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    iconCont: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: TURQOISE_OP,
        paddingTop: 10,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999
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
        width: 30,
        height: 30,
        padding: 5,
        backgroundColor: TURQOISE_OP,
        borderRadius: 10,
        borderColor: WHITE,
        borderWidth: 1,
        marginRight: 5
    },
    deleteBtnIcon: {
        tintColor: WHITE,
        width: '100%',
        height: '100%'
    }
});

export default Card;