import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import fire from './firebase/Firebase'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet,Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback,ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native'

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Register({navigation}) {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Username, setUsername] = useState("")

    const CreateAccount = () => {
        fire.auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {
            console.log('Create and online');
        })
        .catch(error => {
            console.log(error.code)
        });
    }

    return (
        <ImageBackground source={{ uri : 'https://static.wikia.nocookie.net/drstone/images/c/cd/Dr_Stone_Anime.jpg/revision/latest?cb=20190822174535&path-prefix=fr'}} style={styles.imagepopulaire} >
            <LinearGradient
                colors={['#f97833ab', '#12a9ebd1']}
                start={{ x: 0.4, y: 0.4 }}
                end={{ x: 0, y: 0.3}}
                style={styles.background}
            >
                <View style={{width: w / 1.1,flexDirection: "row"}}>
                    <Text style={styles.title}>Inscription</Text>
                </View>
                <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    secureTextEntry
                    onChangeText={(value) => setUsername(value)}
                    value={Username}
                />
                </View>
                <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
                    value={Email}
                />
                </View>

                <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(value) => setPassword(value)}
                    value={Password}
                />
                </View>
                <TouchableOpacity style={styles.login} onPress={() => CreateAccount()}>
                    <Text style={{color: "white", textTransform: "uppercase"}}>S'inscrire</Text>
                </TouchableOpacity>
                <View style={{width: w / 1.1, height: 2, backgroundColor: "#3434346b", marginTop: 10}}></View>
                <View style={{width: w / 1.1,flexDirection: "row"}}>
                <Text style={{color: "white", marginTop: 20}}>Vous avez déjà un compte ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{color: "#2b2b2b", marginTop: 20, fontWeight: "bold"}}>Se connecter</Text>
                </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
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
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: h,
        // justifyContent: 'center',
        alignItems: "center"
      },
      title: {
          fontSize: 40,
          fontWeight: "200",
          color: "white",
          marginTop: h / 5,
          marginBottom: 10

      },
      containerInput: {
          width: w / 1.1,
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 5,
          marginBottom: 10,
          justifyContent: "center"
      },
      input: {
        height: 50,
        margin: 12,
        padding: 10,
      },
      login: {
        width: w / 1.1,
        height: 50,
        backgroundColor: "#2b2b2b",
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      register: {
        width: w / 1.1,
        height: 50,
        backgroundColor: "#0968c3",
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
      },
  });