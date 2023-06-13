import { TextInput as Input, KeyboardAvoidingView, StyleSheet, Text, TextInputSubmitEditingEventData, View } from 'react-native';
import { TURQOISE, YELLOW, RED } from "../../Constants/Colors";
import { useState } from 'react';

type TextInputProps = {
    value?: string;
    label?: string;
    onChangeText?: (value: string) => void;
    placeholder?: string;
    onSubmitEditing?: any;
    blurOnSubmit?: boolean;
    inputRef?: any;
    required?: boolean,
    errors?: string[],
    labelTextStyle?: Object
}

const TextInput = ({ onChangeText, inputRef, value, errors, placeholder, label, labelTextStyle, onSubmitEditing, blurOnSubmit, required, ...props }: TextInputProps) => {

    const [focused, setFocus] = useState(false);

    return (
        <KeyboardAvoidingView style={styles.cont}>
            <View style={styles.labelCont}>
                <Text style={[styles.label, labelTextStyle, { fontWeight: focused ? '700' : '500' }]}>{label}{required && ' *'}</Text>
            </View>

            <Input
                {...props}
                ref={inputRef}
                style={[styles.input, { borderWidth: focused ? 2 : 1 }]}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={blurOnSubmit}
            />

            {errors && errors.map(err => <Text style={styles.err}>{err}</Text>)}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    cont: {
        marginTop: 10
    },
    labelCont: {
        paddingBottom: 5,
    },
    label: {
        fontSize: 16,
        color: TURQOISE
    },
    input: {
        borderRadius: 10,
        borderColor: TURQOISE,
        padding: 10,
        color: TURQOISE,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    err: {
        marginTop: 5,
        color: RED,
        fontWeight: '500'
    }
})

export default TextInput;