import { ScrollView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { TextInput, Button, ParaSm } from "../../Components";
import { TURQOISE, WHITE } from "../../Constants/Colors";
import { useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const [emailErrors, setEmailErrors] = useState([]);

    const emailRef = useRef(null);

    useFocusEffect(() => {
        emailRef.current?.focus();
    })

    return (
        <ScrollView contentContainerStyle={styles.cont}>

            <ImageBackground
                resizeMode="cover"
                source={require('../../../assets/images/pan-rice.jpeg')}
                style={styles.imgCover}>

                <View style={styles.innerCont}>

                    <Text style={styles.title}><Text style={styles.titleLeft}>Recipe</Text><Text style={styles.titleRight}>App</Text></Text>

                    <ParaSm style={{ color: WHITE, marginTop: 10, fontStyle: 'italic' }}>Forgot your password? Enter your email below to reset it. You'll receive an email with instructions on how to create a new one.</ParaSm>

                    <TextInput
                        required={true}
                        errors={emailErrors}
                        inputRef={emailRef}
                        value={email}
                        labelTextStyle={{ color: WHITE }}
                        label="Email"
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                    />

                    <Button
                        style={{ backgroundColor: TURQOISE, borderColor: WHITE }}
                        text={`Submit`}
                    />

                    <TouchableOpacity style={styles.registerBtnCont} onPress={() => navigation.navigate('Login')}>
                        <ParaSm style={styles.registerBtn}>Back to Sign In</ParaSm>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    innerCont: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderColor: TURQOISE,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    titleLeft: {
        color: WHITE,
    },
    titleRight: {
        color: TURQOISE,
        fontWeight: '600',
    },
    imgCover: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerBtnCont: {
        marginTop: 20
    },
    registerBtn: {
        color: TURQOISE,
        textAlign: 'center',
        fontWeight: '600'
    }
});

export default Login;