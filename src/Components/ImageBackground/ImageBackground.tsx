import { useState } from "react";
import { StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { TURQOISE, TURQOISE_OP } from "../../Constants/Colors";

const ImgBackground = ({ children, ...props }) => {

    const [loading, setLoading] = useState(1);

    return (
        <ImageBackground
            {...props}
            onLoadEnd={() => setLoading(0)}>
            {children}
            {loading > 0 &&
                <ActivityIndicator
                    style={styles.loader}
                    color={TURQOISE_OP}
                    size={'large'}
                    animating={loading > 0}
                />
            }
        </ImageBackground>
    )

}

export default ImgBackground;

const styles = StyleSheet.create({
    container: {

    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        color: TURQOISE,
        margin: 'auto',
        zIndex: 999
    }
});