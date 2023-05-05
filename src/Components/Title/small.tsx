import { StyleSheet, Text } from "react-native";

type TitleProps = {
    style?: Object,
    children: React.ReactNode
}

const TitleSm = ({ children, style }: TitleProps) => {

    return (<Text
        numberOfLines={1}
        style={[styles.title, style]}>
        {children}
    </Text>);

}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
});

export default TitleSm;