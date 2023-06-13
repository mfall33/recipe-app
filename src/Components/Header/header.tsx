import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { BLACK, TURQOISE, TURQOISE_OP, WHITE } from "../../Constants/Colors";

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
                <Image source={require('../../../assets/images/Icons/Back.png')} style={styles.backBtn} />
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
                    <Image style={styles.searchCloseIcon} source={require('../../../assets/images/Icons/Close.png')} />
                </TouchableOpacity>
            </View>
        }
    </View>

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: TURQOISE_OP,
        paddingVertical: 10,
        borderBottomColor: WHITE,
        borderBottomWidth: 1,
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
        borderColor: TURQOISE,
        height: '50%',
        margin: 'auto'
    },
    searchCloseIcon: {
        tintColor: TURQOISE,
        height: 18,
        width: 18
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
        tintColor: WHITE,
        width: 30,
        height: 30
    }
})

export default Header;