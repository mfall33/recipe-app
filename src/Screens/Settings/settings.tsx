import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { ScrollView, View } from "react-native";

import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, TextInput } from "../../Components";
import { selectUsername, selectEmail, updateUsername, setUser } from "../../Redux/Store/userStore";

const Settings = () => {

    let currentUsername = useSelector(selectUsername);
    let email = useSelector(selectEmail);

    const [username, setUsername] = useState(currentUsername);
    const [usernameErrors, setUsernameErrors] = useState([]);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onSubmitHandler = () => {

        dispatch(updateUsername(username))
            .unwrap()
            .then((data: any) => {

                if (data.errors) {
                    setUsernameErrors(data.errors.username)
                    return;
                }

                Toast.show({
                    type: 'success',
                    text1: 'Username updated successfully!'
                })

            })
            .catch((err: any) => {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update username..'
                })
            })

    }

    const onUserameChange = (text) => {
        setUsername(text);
        setUsernameErrors([]);
    }

    return (
        <View style={styles.mainCont}>

            <Header backBtnPress={() => navigation.goBack()} subTitle="Profile" />

            <ScrollView contentContainerStyle={styles.cont} showsVerticalScrollIndicator={false}>

                <View style={styles.pad}>

                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={onUserameChange}
                        errors={usernameErrors}
                    />

                    <TextInput
                        editable={false}
                        label="Email"
                        value={email} />

                    <Button text="Update" onPress={() => onSubmitHandler()} />

                </View>

            </ScrollView>

        </View>
    );
}

export default Settings;