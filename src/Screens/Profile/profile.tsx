import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header, ListButton } from "../../Components";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Store/authStore";

const Profile = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <View style={styles.mainCont}>

            <Header subTitle="Profile" />

            <ScrollView contentContainerStyle={styles.cont} showsVerticalScrollIndicator={false}>

                <ListButton text="My Recipes" onPress={() => navigation.navigate('MyRecipes')} />
                <ListButton text="My Collections" onPress={() => navigation.navigate('Collections')} />
                <ListButton text="Liked Recipes" onPress={() => navigation.navigate('LikedRecipes')} />
                <ListButton text="Settings" onPress={() => navigation.navigate('Settings')} />
                <ListButton text="Log-Out" onPress={() => dispatch(logout(false))} />

            </ScrollView>

        </View>
    );
}

export default Profile;