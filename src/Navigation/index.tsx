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

    return (
        <Tab.Navigator initialRouteName="AllRecipes" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="AllRecipes" component={AllRecipesTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
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