import { ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { TURQOISE, WHITE } from '../../Constants/Colors';

type ImageContainerProps = {
    imgUrlPrefix?: string,
    images: String[],
    onDeletePress?: (image: any) => void,
    onPress?: (image: any) => void,
    contStyle?: Object,
    style?: Object,
    imgStyle?: Object,
}

const ImageContainer = ({ images, onPress, onDeletePress, imgUrlPrefix, contStyle, style, imgStyle }: ImageContainerProps) => {


    if (!images && images.length <= 0) return <></>;

    return (


        <ScrollView
            bounces={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.cont, contStyle]}
        >

            {images.map(image =>
                <TouchableOpacity style={[styles.imgCont, style]} onPress={() => onPress && onPress(image)}>
                    <TouchableOpacity style={styles.deleteCont} onPress={() => onDeletePress && onDeletePress(image)}>
                        <Text style={styles.delete}>X</Text>
                    </TouchableOpacity>
                    <Image style={[styles.img, imgStyle]} source={{ uri: `${imgUrlPrefix ? imgUrlPrefix : ''}${image}` }} />
                </TouchableOpacity>
            )}

        </ScrollView>
    );

}

const styles = StyleSheet.create({
    cont: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
    },
    img: {
        backgroundColor: WHITE,
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: TURQOISE,
        borderRadius: 10,
        marginRight: 15,
        zIndex: 1,
    },
    deleteCont: {
        position: 'absolute',
        top: -10,
        right: 0,
        zIndex: 999,
        backgroundColor: TURQOISE,
        opacity: 0.75,
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: WHITE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    delete: {
        color: WHITE
    }
});

export default ImageContainer;