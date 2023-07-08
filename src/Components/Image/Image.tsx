import { useState } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import { TURQOISE, TURQOISE_OP } from "../../Constants/Colors";

const Img = ({ ...props }) => {

    const [loading, setLoading] = useState(1);

    return (
        <View style={styles.container}>
            <Image
                {...props}
                onLoadEnd={() => setLoading(0)}
            />
            <ActivityIndicator
                style={styles.loader}
                color={TURQOISE_OP}
                size={'large'}
                animating={loading > 0}
            />
        </View>
    )

}

export default Img;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '10%',
        color: TURQOISE,
        margin: 'auto',
        zIndex: 999
    }
});