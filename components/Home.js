import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button,Dimensions, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import fire from './firebase/Firebase'
import { LinearGradient } from 'expo-linear-gradient';
import Data from '../Data'
import Categorie from '../Categorie'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Home({navigation}) {

    const [Select, setSelect] = useState(0)
    const [categorie, setCategorie] = useState('Action')
    const [liked, setLiked] = useState(["0"])
    const [deletelike, setDeletelike] = useState([])

    useEffect(()=> {
        console.log('liked',liked);  
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
                        <Ionicons name="heart" size={25} color="white" />
                    </TouchableOpacity>
            )
        }else if (liked.indexOf(item) === -1) {
                    return (
                    <TouchableOpacity onPress={() => AddLike(item)}>      
                        <Ionicons name="heart" size={25} color="white" />
                    </TouchableOpacity>
                    )
                }else if (liked.indexOf(item) >= 0) {
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
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f5a234', '#ff8762']}
                start={{ x: 0.4, y: 0.4 }}
                end={{ x: 0, y: 0.3}}
                style={styles.header}
            >
                <View style={{height: h / 8, width: w / 1.1, justifyContent: 'center' , }}>
                    <Text style={{color: "white", fontWeight: 'bold', textTransform: 'uppercase'}}>Populaire</Text>
                </View>
                <View style={styles.Renderpopulaire}>
                {/* <Text style={styles.titlepopulaire}>Populaire </Text> */}
                <FlatList
                data={Data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', {item: Data[item.key]})}>
                        <ImageBackground source={{ uri : item.img}} style={styles.imagepopulaire} imageStyle={{borderRadius: 10}}>
                            {/* <View style={styles.viewtitlemanga}>
                                <Text style={styles.titlemanga}>{item.title}</Text>
                            </View> */}
                        </ImageBackground>
                        <View style={styles.viewtitlemanga}>
                                <Text style={styles.titlemanga}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                />
            </View>
            <View style={{height: 70, width: '100%'}}>
                <FlatList
                data={Categorie}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => getid(item.id, item.title)} style={{marginLeft: 10,alignItems: 'center',justifyContent: 'center', marginTop: 20, height: 35,paddingLeft: 10,paddingRight: 10,borderRadius:5, backgroundColor: item.id !== Select ? "rgba(252, 252, 252, 0.0)" : "#00000085"}}>
                        <Text style={{textTransform: 'uppercase', fontWeight: 'bold',color: item.id !== Select ? 'rgba(255, 255, 255, 0.8)' : colors.white}}>{item.title}</Text>
                    </TouchableOpacity>
                )} />
            </View>

            <View style={{width: '100%', marginBottom: 290}}>
                <FlatList 
                data={Data.filter(datas => datas.genre == categorie)}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row', paddingBottom: 20, width: '75%'}}>
                            <View>
                                <Image style={styles.categorieimg} source={{uri : item.img}} />
                            </View>
                            <View style={{width: '85%'}}>
                                <Text style={{color: colors.white, marginLeft: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>{item.title}</Text>
                                <Text style={{color: colors.white,marginTop: 20,fontSize: 12, marginLeft: 10}}>{item.synopsis.substr(0, 150) + '...'}</Text>
                                
                                <View style={{bottom: 0,width: '100%', position: 'absolute', alignItems: 'flex-end'}}>

                                                   
                                {likee(item.key)}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                />
            </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagepopulaire: {
        width: w,
        height: h ,
        resizeMode: "cover",
        justifyContent: "center"
      },
      header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: h ,
        // justifyContent: 'center',
        alignItems: "center"
      },
      populaire: {
        flexDirection: 'column',
        // marginTop: 10    
    },
    imagepopulaire: {
        width: 180,
        height: 130,
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
          color: colors.white,
          marginTop: 20,
      },
      viewtitlemanga: {
        bottom: 0, 
        position: 'absolute', 
        // backgroundColor: colors.black, 
        width: '100%', 
        height: 40, 
        marginTop: 20,
        marginLeft: 13,
        // alignItems: 'center', 
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      Renderpopulaire: {
          height: 160,
          marginTop: -20
      },
      categorieimg : {
        width: 120,
        height: 180,
        borderRadius: 10,
        resizeMode: 'cover',
        marginLeft: 10
    }
  });
  
