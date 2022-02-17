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
        <View style={styles.imagepopulaire} >
            <View style={styles.background}>
                <View style={{width: w / 1.1,flexDirection: "row"}}>
                    <Text style={styles.title}>Inscription</Text>
                </View>
                <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
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
                <View style={{width: w / 1.1,flexDirection: "column"}}>
                <Text style={{color: "white", marginTop: 20, fontSize: 20, textTransform: "uppercase", marginBottom: 20}}>Vous avez déjà un compte ? </Text>
                <TouchableOpacity style={{ backgroundColor: "#6f00f8", borderRadius: 5, borderWidth: 1, borderColor: "#6402dd"}} onPress={() => navigation.navigate('Login')}>
                <Text style={{color: "white",textTransform: "uppercase", padding: 20, fontWeight: "bold"}}>Se connecter</Text>
                </TouchableOpacity>
                </View>
            </View>
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
      background: {
        position: 'absolute',
        backgroundColor: "#6851ff",
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