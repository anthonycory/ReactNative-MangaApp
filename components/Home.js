import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button, Dimensions, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import fire from './firebase/Firebase'
import { LinearGradient } from 'expo-linear-gradient';
import Data from '../Data'
import Categorie from '../Categorie'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';


import logo from "../assets/Loginbackground.jpg"
import { LikeContext } from './context/LikeContext';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;



export default function Home({ navigation }) {

    const { liked, setLiked } = useContext(LikeContext)


    const [Select, setSelect] = useState(0)
    const [categorie, setCategorie] = useState('Action')
    // const [liked, setLiked] = useState([])
    const [deletelike, setDeletelike] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log('liked', liked);
        console.log(deletelike)

     
    }, [liked, deletelike])

    const getid = (id, categorie) => {
        setSelect(id)
        setCategorie(categorie)
    }

    const likee = (item) => {
        const AddLike = (item) => {
            if (liked.indexOf(item) === -1) {
                const newArr = [...liked]
                newArr.push(item)
                setLiked(newArr)
            }
        }

        const Removelike = (item) => {
            const deletedArr = liked
            const id = deletedArr.indexOf(item)
            setDeletelike([item])
            deletedArr.splice(id, 1)
            setLiked(deletedArr)
        }


        if (liked.length <= 0) {
            return (
                <TouchableOpacity onPress={() => AddLike(item)}>
                    <Ionicons name="heart" size={25} color="gray" />
                </TouchableOpacity>
            )
        } else if (liked.indexOf(item) === -1) {
            return (
                <TouchableOpacity onPress={() => AddLike(item)}>
                    <Ionicons name="heart" size={25} color="gray" />
                </TouchableOpacity>
            )
        } else if (liked.indexOf(item) >= 0) {
            return (
                <TouchableOpacity onPress={() => Removelike(item)}>
                    <Ionicons name="heart" size={25} color="red" />
                </TouchableOpacity>
            )
        }
    }

    const Logout = () => {
        fire.auth()
            .signOut()
            .then(() => console.log("user signed out"))
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    return (
        <View style={styles.container}>
            <Modal isVisible={isModalVisible} animationIn="slideInUp" animationInTiming={600} >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(!isModalVisible)}>
                    <TouchableOpacity onPress={() => Logout()} style={{ width: w / 1.1, height: 40, position: "absolute", bottom: 0, left: 0, backgroundColor: "#791818", alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                        <Text style={{ color: colors.white, }}>DECONNEXION</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            </Modal>
            <SafeAreaView style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* VIEW HEADER */}
                <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "auto", padding: 10 }}>
                        <Icon style={{ marginLeft: 10 }} name="dots-three-horizontal" size={20} color="#fff" />
                    </TouchableOpacity>

                </View>
                {/* END VIEW HEADER */}

                <View style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: 20 }}>
                    <Text style={{ marginLeft: 15, color: "white", fontWeight: "600", fontSize: 20 }}>Hello !</Text>


                    {/*  VIEW SELECTED CATEGORY*/}
                    <View style={{ width: "100%", marginTop: 20 }}>
                        <FlatList
                            data={Categorie}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => getid(item.id, item.title)} style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center', height: 35, paddingLeft: 10, paddingRight: 10, borderRadius: 5, backgroundColor: item.id !== Select ? "#d8d8d8" : "#6f00f8", borderWidth: item.id !== Select ? "" : "", borderColor: item.id !== Select ? "black" : "" }}>
                                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: item.id !== Select ? 'black' : colors.white }}>{item.title}</Text>
                                </TouchableOpacity>
                            )} />
                    </View>
                    {/*  END VIEW SELECTED CATEGORY*/}

                    {/* VIEW MANGA */}
                    <View style={{ width: "100%", height: "100%", backgroundColor: "white", alignItems: "center", marginTop: 10, paddingBottom: h / 5 }}>

                        <FlatList
                            data={Data.filter(datas => datas.genre.includes(categorie))}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            style={{ width: "95%" }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>

                                    <View style={{ width: "100%", marginTop: 10, display: "flex", flexDirection: "row", backgroundColor: "#d8d8d8", borderRadius: 5, border: 1, borderColor: "black" }}>
                                        <Image style={styles.categorieimg} source={{ uri: item.img }} />
                                        <View style={{ width: "80%", display: "flex", flexDirection: "column" }}>
                                            <Text style={{ padding: 10, fontWeight: "bold" }}>{item.title}</Text>
                                            <Text style={{ width: "80%", padding: 10 }}>{item.synopsis.substring(0, 150) + '...'}</Text>
                                            <View style={{ width: "80%", bottom: 0, position: "absolute", display: "flex", flexDirection: "row-reverse", alignItems: "flex-start", padding: 10, paddingBottom: 20 }}>

                                                {likee(item.key)}
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />


                    </View>
                    {/* END VIEW MANGA */}
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6851ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagepopulaire: {
        width: w,
        height: h,
        resizeMode: "cover",
        justifyContent: "center"
    },
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: h,
        // justifyContent: 'center',
        alignItems: "center"
    },
    populaire: {
        flexDirection: 'column',
        // marginTop: 10    
    },
    imagepopulaire: {
        width: 180,
        height: 150,
        borderRadius: 20,
        marginLeft: 10
    },
    titlepopulaire: {
        marginLeft: 10,
        color: colors.white,
        textTransform: 'uppercase',
        //   marginBottom: 10,
    },
    titlemanga: {
        textTransform: 'uppercase',
        color: "black",
        fontWeight: "bold",
        marginTop: 15,
        textAlign: "center",
        lineHeight: 50
    },
    viewtitlemanga: {
        bottom: 0,
        position: 'absolute',
        // backgroundColor: colors.black, 
        width: '100%',
        height: 40,
        marginTop: 20,
        marginLeft: 13,
        display: "flex",
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    Renderpopulaire: {
        height: 160,
        marginTop: 20,
        //   backgroundColor: "black"
    },
    categorieimg: {
        width: 120,
        height: 180,
        // borderRadius: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        resizeMode: 'cover',
    }
});

