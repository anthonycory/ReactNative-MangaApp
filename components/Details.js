import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LikeContext } from './context/LikeContext';
import { ScrollView } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import Data from '../Data';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Details({ navigation, route }) {

    const item = route.params.item;
    const liked = useContext(LikeContext)

  console.log(Data.filter((fil) => fil.genre.includes("Action")))

    return (
        <View style={{ flex: 1, backgroundColor: "#6851ff" }}>
            <ImageBackground source={{ uri: item.img }} style={styles.backgroundImage}>
                <LinearGradient style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 0, y: 6 }} locations={[0, 0.1, 1]} colors={['#08080803', '#000000', '#080808eb']}>
                    <SafeAreaView style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                        {/* HEADER VIEW*/}
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate('Home')}>
                            <View>
                                <Ionicons name="arrow-back-outline" size={30} color="white" />
                            </View>
                        </TouchableOpacity>
                        {/* END HEADER VIEW */}


                        <View style={{ flex: 1 }}>
                            <ScrollView >

                                {/* MANGA DATA VIEW */}
                                <Text style={{ paddingLeft: 10, color: "white", marginTop: h / 5, textTransform: "uppercase", fontSize: 20 }}>{item.title}</Text>
                                <View style={{ paddingLeft: 10, marginTop: 10, width: "100%", height: 10, display: "flex", alignItems: "baseline" }}>
                                    <AirbnbRating count={5} defaultRating={item.note / 2} showRating={false} size={10} isDisabled size={20} />
                                </View>

                                <FlatList
                                    data={item.genre}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', height: 35, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: "#6851ff" }}>
                                            <Text style={{
                                                color: "white"
                                            }}>{item}</Text>
                                        </TouchableOpacity>
                                    )} />

                                <Text style={{ color: "white", paddingLeft: 20, paddingTop: 20 }}>{item.synopsis}</Text>
                                {/* END MANGA DATA VIEW */}


                                <Text style={{color: "#fff", marginTop: 30, paddingLeft: 20, fontSize: 20, textTransform: "uppercase", fontWeight: "bold"}}>Dans le même genre</Text>
                                <FlatList
                                    data={Data.filter((fil) => fil.genre.includes(item.genre[0]))}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, borderRadius: 5 }}>
                                            <ImageBackground source={{ uri: item.img }} style={{ width: 200, height: 150}} imageStyle={{ borderRadius: 10}}></ImageBackground>
                                        </TouchableOpacity>
                                    )} />
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: { width: "100%", height: "100%", flex: 1 },

});