import { StyleSheet, Text } from "react-native";

type ParaProps = {
    style?: Object,
    children: React.ReactNode
}

const ParaMd = ({ children, style }: ParaProps) => {

    return (<Text
        numberOfLines={1}
        style={[styles.title, style]}>
        {children}
    </Text>)

}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
});

export default ParaMd;