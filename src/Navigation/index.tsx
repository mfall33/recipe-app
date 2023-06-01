import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { selectLoggedIn } from "../Redux/Store/authStore";
import { AllRecipesScreen, MyRecipesScreen } from '../../src/Screens/Recipes';
import { RecipeScreen } from '../../src/Screens/Recipe';
import { RecipeAddScreen } from '../../src/Screens/RecipeAdd';
import { LoginScreen } from '../../src/Screens/Login';
import { RegisterScreen } from '../../src/Screens/Register';
import { ForgotPasswordScreen } from '../../src/Screens/ForgotPassword';
import { ProfileScreen } from '../../src/Screens/Profile';
import { SettingsScreen } from '../Screens/Settings';
import { TURQOISE, WHITE } from '../Constants/Colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )

}

const MainNavigator = () => {

    const tabBarOptions = {
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveBackgroundColor: TURQOISE,
        tabBarActiveTintColor: WHITE,
        tabBarInactiveTintColor: TURQOISE,
        tabBarLabelStyle: styles.tabBarLabelStyle,
    }

    return (
        <Tab.Navigator
            initialRouteName="AllRecipes"
            screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="AllRecipes"
                component={AllRecipesTab}
                options={{
                    ...tabBarOptions,
                    tabBarLabel: 'Recipes',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            style={[styles.tabBarIconStyle, { tintColor: focused ? WHITE : TURQOISE }]}
                            source={require('../../assets/images/Icons/Recipe-Book.png')}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileTab}
                options={{
                    ...tabBarOptions,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={[styles.tabBarIconStyle, { tintColor: focused ? WHITE : TURQOISE }]}
                                source={require('../../assets/images/Icons/User.png')}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    );

}

const AllRecipesTab = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Recipes" component={AllRecipesScreen} />
            <Stack.Screen name="MyRecipes" component={MyRecipesScreen} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            <Stack.Screen name="RecipeAdd" component={RecipeAddScreen} />
        </Stack.Navigator>
    )

}

const ProfileTab = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )

}

const RootNav = () => {

    const loggedIn = useSelector(selectLoggedIn);

    return (
        <NavigationContainer>
            {loggedIn ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer >
    );
}

export default RootNav;

const styles = StyleSheet.create({
    tabBarItemStyle: {
        borderTopWidth: 2,
        borderTopColor: WHITE
    },
    tabBarLabelStyle: {
        fontSize: 12, fontWeight: '500'
    },
    tabBarIconStyle: {
        width: 25, height: 25,
    }
})