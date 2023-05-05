import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { BLACK, ORANGE, TURQOISE, WHITE } from "../../Constants/Colors";

type HeaderProps = {
    backBtnPress?: () => void,
    onChange?: (e: any) => void,
    onSubmit?: () => void,
    onCancel?: () => void,
    subTitle?: string,
    search?: string
}

const Header = ({ backBtnPress, onChange, onSubmit, onCancel, subTitle, search }: HeaderProps) => {

    return <View style={styles.header}>
        {backBtnPress &&
            <TouchableOpacity style={styles.backBtnCont} onPress={backBtnPress}>
                <Text style={styles.backBtn}>{"Back"}</Text>
            </TouchableOpacity>
        }
        <View>
            <Text style={styles.title}><Text style={styles.titleLeft}>Recipe</Text><Text style={styles.titleRight}>App</Text></Text>
            {subTitle &&
                <Text style={styles.subTitle}>'{subTitle}'</Text>
            }
        </View>
        {(onChange || onSubmit) &&
            <View style={styles.searchCont}>
                <TextInput
                    value={search}
                    blurOnSubmit={false}
                    style={styles.search}
                    onChangeText={onChange}
                    onSubmitEditing={onSubmit}
                    placeholder="Margheritta, Chicken Paella, Spaghetti Bolognese..." />
                <TouchableOpacity
                    style={styles.searchClose}
                    onPress={onCancel}>
                    <Text style={styles.searchCloseIcon}>X</Text>
                </TouchableOpacity>
            </View>
        }
    </View>

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: TURQOISE,
        paddingVertical: 10,
        borderBottomColor: WHITE,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 25,
        textAlign: 'center'
    },
    titleLeft: {
        color: WHITE,
    },
    titleRight: {
        color: BLACK,
        fontWeight: '600',
    },
    subTitle: {
        fontStyle: 'italic',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
        color: WHITE
    },
    searchCont: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchClose: {
        position: 'absolute',
        right: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        backgroundColor: TURQOISE,
        borderRadius: 20,
        height: '50%',
        margin: 'auto'
    },
    searchCloseIcon: {
        color: WHITE,
        fontWeight: '600',
        paddingHorizontal: 7
    },
    search: {
        backgroundColor: WHITE,
        position: 'relative',
        width: '100%',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    backBtnCont: {
        padding: 10,
        zIndex: 999,
        position: 'absolute',
        top: 0,
        left: 0
    },
    backBtn: {
        color: WHITE,
        fontSize: 15,
        fontWeight: '600'
    }
})

export default Header;