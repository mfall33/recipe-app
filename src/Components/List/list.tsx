import Item from './item';
import { StyleSheet, Text } from 'react-native';

type listProps = {
    items: any,
    err: string,
    itemPress: (item: any) => void,
    itemDeletePress: (item: any) => void,
    itemDisplayKey: string
}

const List = ({ items, err, itemPress, itemDeletePress, itemDisplayKey }: listProps) => {

    return (items.length ?
        items.map((item) =>
            <Item
                key={item._id}
                item={item}
                itemDisplayKey={itemDisplayKey}
                callback={itemPress}
                closeCallback={itemDeletePress}
            />) :
        <Text style={styles.err}>{err}</Text>
    )

}

const styles = StyleSheet.create({
    err: {
        padding: 20,
        fontWeight: '500',
        textAlign: 'center'
    }
});

export default List;