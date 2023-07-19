import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TURQOISE, RED, TURQOISE_OP, WHITE } from "../../Constants/Colors";

type TextInputProps = {
    containerStyle?: Object,
    label?: string;
    required?: boolean,
    errors?: string[],
    labelTextStyle?: Object,
    pills: Object[],
    onPress: () => void,
    pillKey: string,
}

const Pills = ({ pills, containerStyle, errors, label, labelTextStyle, required, pillKey, onPress }: TextInputProps) => {

    return (
        <KeyboardAvoidingView style={[styles.cont, containerStyle]}>
            <View style={styles.labelCont}>
                <Text style={[styles.label, labelTextStyle]}>{label}{required && ' *'}</Text>
            </View>

            <View style={styles.pillCont}>
                {
                    pills.map(pill => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={pill.selected ? styles.pillSelected : styles.pillUnselected}
                                onPress={() => onPress(pill)}>
                                <Text
                                    style={pill.selected ? styles.pillTextSelected : styles.pillTextUnselected}
                                >{pill[`${pillKey}`]}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>

            {errors && errors.map(err => <Text style={styles.err}>{err}</Text>)}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    cont: {
        marginTop: 10
    },
    labelCont: {
        paddingBottom: 10,
        fontWeight: '500'
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: TURQOISE
    },
    err: {
        marginTop: 5,
        color: RED,
        fontWeight: '500',
    },
    pillCont: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    pillUnselected: {
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: TURQOISE,
        marginRight: 8,
        marginBottom: 8
    },
    pillSelected: {
        backgroundColor: TURQOISE_OP,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: TURQOISE,
        marginRight: 8,
        marginBottom: 8
    },
    pillTextSelected: {
        color: WHITE,
        fontWeight: '500'
    },
    pillTextUnselected: {
        color: TURQOISE,
        fontWeight: '500'
    },

})

export default Pills;