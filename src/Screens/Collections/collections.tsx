import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, Alert, FlatList, Image } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { styles } from "./styles";
import { RED, TURQOISE, TURQOISE_OP } from "../../Constants/Colors";
import { PlusBtn, Header, Card } from "../../Components";
import { getCollections, selectCollectionStatus, selectCollections } from "../../Redux/Store/collectionStore";

const Recipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);

    const collectionStatus = useSelector(selectCollectionStatus);
    const collections = useSelector(selectCollections);

    const refreshData = async () => {
        setRefreshing(true);
        setRefreshing(false);
    }

    useEffect(() => {
        
        if (collectionStatus === 'idle') {
            alert(44)
            dispatch(getCollections());
        }
    }, [collectionStatus, dispatch]);

    return (
        <View style={styles.cont}>

            <Header
                subTitle="My Collections"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollCont}
                refreshControl={
                    <RefreshControl
                        tintColor={TURQOISE}
                        progressBackgroundColor={TURQOISE}
                        refreshing={refreshing}
                        onRefresh={refreshData} />
                }
            >


                <Text>Collections: {JSON.stringify(collections)}</Text>



            </ScrollView>
            {/* <PlusBtn onPress={() => navigation.navigate("RecipeAdd")} /> */}
        </View>
    );
}

export default Recipes;