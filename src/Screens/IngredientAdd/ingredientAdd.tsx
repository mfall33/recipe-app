import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

import { TextInput, Button, Header } from "../../Components";
import { styles } from "./styles";
import { WHITE } from "../../Constants/Colors";

const IngredientAdd = ({ route }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { handleIngredientData } = route.params;

    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');

    const [ingredientErrors, setNameErrors] = useState([]);
    const [amountErrors, setAmountErrors] = useState([]);
    const [unitErrors, setUnitErrors] = useState([]);

    const ingredientRef = useRef(null);
    const amountRef = useRef(null);
    const unitRef = useRef(null);

    const onSubmitHandler = () => {
        navigation.goBack();

        handleIngredientData({
            name: selectedIngredient,
            amount: selectedAmount,
            unit: selectedUnit.toLowerCase(),
        });
    };

    return (
        <View style={{
            height: '100%',
            paddingVertical: 0
        }}>

            <Header
                backBtnPress={() => navigation.goBack()}
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.pad}>

                    <TextInput
                        required={true}
                        errors={ingredientErrors}
                        inputRef={ingredientRef}
                        value={selectedIngredient}
                        label="Ingredient"
                        placeholder="Eggs, Milk, Flour, Water..."
                        onSubmitEditing={() => amountRef.current?.focus()}
                        onChangeText={(text) => setSelectedIngredient(text)}
                    />

                    <View style={{
                        display: 'flex', flexDirection: 'row',
                    }}>

                        <TextInput
                            containerStyle={{ flex: 1, paddingRight: 5 }}
                            required={true}
                            errors={amountErrors}
                            inputRef={amountRef}
                            value={selectedAmount}
                            label="Amount"
                            placeholder=""
                            blurOnSubmit={false}
                            onSubmitEditing={() => unitRef.current?.focus()}
                            onChangeText={(text) => setSelectedAmount(text)}
                        />

                        <TextInput
                            containerStyle={{ flex: 1, paddingLeft: 5 }}
                            required={true}
                            errors={unitErrors}
                            inputRef={unitRef}
                            value={selectedUnit}
                            label="Unit"
                            placeholder="l, ml, g, kgs..."
                            blurOnSubmit={false}
                            onChangeText={(text) => setSelectedUnit(text)}
                        />

                    </View>

                </View>

            </ScrollView>

            <View style={styles.btnCont}>

                <Button
                    text={`SUBMIT`}
                    style={{ borderColor: WHITE }}
                    onPress={onSubmitHandler}
                    disabled={false}
                />
            </View>

        </View>
    );
}

export default IngredientAdd;