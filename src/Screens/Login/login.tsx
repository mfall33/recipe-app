import { ScrollView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextInput, Button, ParaSm } from "../../Components";
import { TURQOISE, WHITE } from "../../Constants/Colors";
import { selectAccessToken, selectLoggedIn, signin } from "../../Redux/Store/authStore";
import Toast from "react-native-toast-message";

const Login = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('mfal33');
    const [password, setPassword] = useState('Matthewfallon33!');

    const [usernameErrors, setUsernameErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const loggedIn = useSelector(selectLoggedIn);
    const accessToken = useSelector(selectAccessToken);

    useFocusEffect(
        useCallback(() => {
            usernameRef.current?.focus();
        }, [])
    );

    const clearFields = () => {
        setUsername('');
        setPassword('');
    }

    const onSubmitHandler = async () => {
        await dispatch(signin({ username, password }))
            .unwrap()
            .then(async (data) => {

                if (data.errors) {
                    setUsernameErrors(data.errors.username);
                    setPasswordErrors(data.errors.password);
                    return;
                }

                // clearFields();

                navigation.navigate('Recipes');

                return Toast.show({
                    type: 'success',
                    text1: 'Logged in successfully!'
                });

            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to login...'
                })
            })
    }

    return (
        <ScrollView contentContainerStyle={styles.cont}>

            <ImageBackground
                resizeMode="cover"
                source={require('../../../assets/images/pan-rice.jpeg')}
                style={styles.imgCover}>

                <View style={styles.innerCont}>

                    <Text style={styles.title}><Text style={styles.titleLeft}>Recipe</Text><Text style={styles.titleRight}>App</Text></Text>

                    <TextInput
                        required={true}
                        errors={usernameErrors}
                        inputRef={usernameRef}
                        value={username}
                        labelTextStyle={{ color: WHITE }}
                        label="Username/Email"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        required={true}
                        secureTextEntry={true}
                        errors={passwordErrors}
                        inputRef={passwordRef}
                        value={password}
                        labelTextStyle={{ color: WHITE }}
                        label="Password"
                        onChangeText={setPassword}
                    />

                    <Button
                        onPress={onSubmitHandler}
                        style={{ backgroundColor: TURQOISE, borderColor: WHITE }}
                        text={`Login`}
                    />

                    <TouchableOpacity style={styles.registerBtnCont} onPress={() => navigation.navigate('Register')}>
                        <ParaSm style={styles.registerBtn}>Need an account? <Text style={{ color: TURQOISE, fontWeight: '600' }}>Register now!</Text></ParaSm>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerBtnCont} onPress={() => navigation.navigate('ForgotPassword')}>
                        <ParaSm style={styles.registerBtn}>Forgot Password?</ParaSm>
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
        color: WHITE,
        textAlign: 'center',
    }
});

export default Login;