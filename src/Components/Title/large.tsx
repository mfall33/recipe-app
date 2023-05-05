import { StyleSheet, Text } from "react-native";

type TitleProps = {
    style?: Object,
    children: React.ReactNode
}

const TitleLg = ({ children, style }: TitleProps) => {

    return (<Text
        numberOfLines={1}
        style={[styles.title, style]}>
        {children}
    </Text>)

}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: "600"
    }
});

export default TitleLg;