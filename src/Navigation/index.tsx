import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { selectLoggedIn } from "../Redux/Store/authStore";

import { RecipesScreen } from '../../src/Screens/Recipes';
import { RecipeScreen } from '../../src/Screens/Recipe';
import { RecipeAddScreen } from '../../src/Screens/RecipeAdd';
import { LoginScreen } from '../../src/Screens/Login';
import { RegisterScreen } from '../../src/Screens/Register';
import { ForgotPasswordScreen } from '../../src/Screens/ForgotPassword';

const Stack = createNativeStackNavigator();

const RootNav = () => {

    const loggedIn = useSelector(selectLoggedIn);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='Login'>


                {!loggedIn ? (<>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                </>
                ) : <><Stack.Screen name="Recipes" component={RecipesScreen} />
                    <Stack.Screen name="Recipe" component={RecipeScreen} />
                    <Stack.Screen name="RecipeAdd" component={RecipeAddScreen} />
                </>}






            </Stack.Navigator>
        </NavigationContainer>
    );
}

const AuthScreens = () => {

}

export default RootNav;