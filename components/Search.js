import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button,Dimensions,TextInput, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import fire from './firebase/Firebase'
import { LinearGradient } from 'expo-linear-gradient';
import Data from '../Data'
import Categorie from '../Categorie'
import colors from '../assets/colors/colors'
import { FontAwesome } from '@expo/vector-icons';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Search() {
    const [result, setResult] = useState('')
    const filterData = Data.filter((item) => {
        return item.title.toLowerCase().indexOf(result) >= 0
    })

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#f5a234', '#ff8762']}
                start={{ x: 0.4, y: 0.4 }}
                end={{ x: 0, y: 0.3}}
                style={styles.background}
            >
                <View style={styles.containerTextInput}>
                    <TextInput onChangeText={(value) => setResult(value.toLowerCase())} value={result} style={styles.search} placeholder="Quel manga cherchez vous ?"></TextInput>
                </View>

                <View style={{width: w / 1.1, marginTop: 10, flex: 1}}>
                <FlatList 
                data={filterData}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity style={{justifyContent: 'space-between'}}>
                        <ImageBackground style={styles.categorieimg} imageStyle={{borderRadius: 10}} source={{uri : item.img}} >  
                                     
                        </ImageBackground>
                        <Text style={{marginLeft: 7, marginTop: -5, marginBottom: 5, color: colors.white}}>{item.title.substr(0, 30)}</Text>
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
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: h ,
        // justifyContent: 'center',
        alignItems: "center"
      },
      containerTextInput: {
          width: w / 1.1,
          height: 50,
          backgroundColor: colors.white,
          marginTop:45,
          borderRadius: 5,
          justifyContent: 'center',
      },
      search :{
        marginLeft: 10
      },
      categorieimg : {
        width: w / 1.1 / 2.1,
        height: h / 4,
        borderRadius: 10,
        resizeMode: 'cover',
        marginRight: 10,
        marginBottom: 10,
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5
    }
  });