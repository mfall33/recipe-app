import { setCollection } from "../Redux/Store/collectionStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const useCollections = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const collection = useSelector(state => state.collections.collection);

    const viewCollection = (item) => {
     
        dispatch(setCollection(item._id));
        navigation.navigate('Collection');

    }

    return { collection, viewCollection };

}

export default useCollections;