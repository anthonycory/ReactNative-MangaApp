import React from 'react'
import { View, Text, StyleSheet , Dimensions, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Details({navigation, route}) {

    const {item} = route.params;

    return (
        <View style={styles.container}>
        <LinearGradient
            colors={['#f5a234', '#ff8762']}
            start={{ x: 0.4, y: 0.4 }}
            end={{ x: 0, y: 0.3}}
            style={styles.header}
        >
            <View style={{width: w / 1.1, flexDirection: 'row', justifyContent: 'space-between', marginTop: h / 17, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back-outline" size={30} color="white" />
                </TouchableOpacity>
                <Text style={{color: colors.white, fontWeight: 'bold'}}>{item.title}</Text>
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
  });