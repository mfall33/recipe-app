import { StyleSheet, Text } from "react-native";

type ParaProps = {
    style?: Object,
    children: React.ReactNode
}

const ParaSm = ({ children, style }: ParaProps) => {

    return (<Text
        style={[styles.title, style]}>
        {children}
    </Text>)

}

const styles = StyleSheet.create({
    title: {
        fontSize: 15
    }
});

export default ParaSm;