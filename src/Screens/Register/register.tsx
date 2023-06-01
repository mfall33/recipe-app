import { ScrollView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { TextInput, Button, ParaSm } from "../../Components";
import { BLACK_OP_HEAVY, TURQOISE, WHITE } from "../../Constants/Colors";

import { signup } from "../../Redux/Store/authStore";

const Register = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErrors, setUsernameErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useFocusEffect(
        useCallback(() => {
            usernameRef.current?.focus();
            clearErrors();
        }, [])
    );

    const clearErrors = () => {
        setUsernameErrors([]);
        setEmailErrors([]);
        setPasswordErrors([]);
    }

    const clearFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const onSubmitHandler = async () => {
        await dispatch(signup({ username, password, email }))
            .unwrap()
            .then(data => {

                if (data.errors) {
                    setUsernameErrors(data.errors.username);
                    setEmailErrors(data.errors.email);
                    setPasswordErrors(data.errors.password);
                    return;
                }

                clearFields();

                navigation.navigate('Login');

                return Toast.show({
                    type: 'success',
                    text1: 'Account registered successfully!'
                });

            })
            .catch(err => Toast.show({
                type: 'error',
                text1: 'Failed to register...'
            }))
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
                        label="Username"
                        onSubmitEditing={() => emailRef.current?.focus()}
                        onChangeText={(text) => {
                            setUsername(text)
                        }}
                    />

                    <TextInput
                        required={true}
                        errors={emailErrors}
                        inputRef={emailRef}
                        value={email}
                        labelTextStyle={{ color: WHITE }}
                        label="Email"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                    />

                    <TextInput
                        required={true}
                        errors={passwordErrors}
                        secureTextEntry={true}
                        inputRef={passwordRef}
                        value={password}
                        labelTextStyle={{ color: WHITE }}
                        label="Password"
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                    />

                    <Button
                        onPress={onSubmitHandler}
                        style={{ backgroundColor: TURQOISE, borderColor: WHITE }}
                        text={`Sign Up`}
                    />

                    <TouchableOpacity style={styles.loginBtnCont} onPress={() => navigation.navigate('Login')}>
                        <ParaSm style={styles.loginBtn}>Have an account? <Text style={{ color: TURQOISE, fontWeight: '600' }}>Login!</Text></ParaSm>
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
        backgroundColor: BLACK_OP_HEAVY
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
    loginBtnCont: {
        marginTop: 20
    },
    loginBtn: {
        color: WHITE,
        textAlign: 'center',
    }
});

export default Register;