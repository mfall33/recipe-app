import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import { TextInput, Button, Header, TitleMd } from "../../Components";
import { styles } from "./styles";
import { WHITE } from "../../Constants/Colors";

const IngredientAdd = ({ route }) => {

    const navigation = useNavigation();

    const { addIngredientData } = route.params;

    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');

    const [ingredientErrors, setIngredientErrors] = useState([]);
    const [amountErrors, setAmountErrors] = useState([]);
    const [unitErrors, setUnitErrors] = useState([]);

    const ingredientRef = useRef(null);
    const amountRef = useRef(null);
    const unitRef = useRef(null);

    const onSubmitHandler = () => {

        let error = false;

        if (!selectedIngredient) { error = true; setIngredientErrors(['Ingredient name is required!']) };
        if (!selectedAmount) { error = true; setAmountErrors(['Ingredient amount is required!']) };
        if (isNaN(selectedAmount)) { error = true; setAmountErrors(['Amount must be numeric!']) };
        if (!selectedUnit) { error = true; setUnitErrors(['Ingredient unit is required!']) };

        if (error) return;

        addIngredientData({
            name: selectedIngredient,
            amount: selectedAmount,
            unit: selectedUnit.toLowerCase(),
        });

        navigation.goBack();
    };

    return (
        <View style={styles.cont}>

            <Header
                backBtnPress={() => navigation.goBack()}
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.pad}>

                    <TitleMd style={styles.title}>Add Ingredient</TitleMd>

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

                    <View style={styles.inputCont}>

                        <TextInput
                            containerStyle={styles.input}
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
                            containerStyle={styles.input}
                            required={true}
                            errors={unitErrors}
                            inputRef={unitRef}
                            value={selectedUnit}
                            label="Unit"
                            placeholder="l, ml, g, kgs..."
                            blurOnSubmit={false}
                            onSubmitEditing={onSubmitHandler}
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