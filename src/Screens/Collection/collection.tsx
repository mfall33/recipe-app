
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header, Card } from "../../Components";
import { useCollections, useRecipes } from "../../Hooks";
import { styles } from "./styles";
import { useDispatch } from 'react-redux';
import { TURQOISE_OP } from '../../Constants/Colors';
import { likeRecipe } from '../../Redux/Store/recipeStore';
import { getCollections } from '../../Redux/Store/collectionStore';

const Collection = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { collection } = useCollections();
    const { viewRecipe } = useRecipes();

    return (
        <View style={styles.mainCont}>

            <Header
                subTitle={collection.name}
                backBtnPress={() => navigation.goBack()} />

            <ScrollView
                contentContainerStyle={styles.cont}
                showsVerticalScrollIndicator={false}>

                <View>

                    {collection.recipes.length > 0 ?
                        <FlatList
                            data={collection.recipes}
                            renderItem={({ item }) => {

                                return (
                                    <Card
                                        onPress={() => viewRecipe(item)}
                                        title={item.name}
                                        subTitle={item.duration}
                                        bottomText={item.user.username}
                                        image={item.images[0]}
                                        createdAt={item.created_at}
                                        onLikePress={() => {
                                            dispatch(likeRecipe(item))
                                                .unwrap()
                                                .then(data => {
                                                    dispatch(getCollections())
                                                })
                                        }}
                                        liked={item.liked}
                                    />)
                            }
                            }
                        /> :
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Text style={{ padding: 10, textAlign: 'center', fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60 }}>Seems like this <Text style={{ color: TURQOISE_OP }}>Recipe</Text> collection needs a pinch of inspiration</Text>
                            <Image source={require('../../../assets/images/Icons/Flour.png')} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                        </View>
                    }

                </View>

            </ScrollView>

        </View >
    );
}

export default Collection;