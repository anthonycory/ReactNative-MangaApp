import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet,Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback,ImageBackground, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native'
import fire from './firebase/Firebase'

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export default function Login({navigation}) {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const Authentication = () => {
        fire.auth().signInWithEmailAndPassword(Email, Password)
        .then(() => {
            console.log("tu as réussi a te connecter")
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.message)
          });
    }

    return (
        <View style={styles.imagepopulaire} >
            <View style={styles.background}>
                <View style={{width: w / 1.1,flexDirection: "row"}}>
                    <Text style={styles.title}>Connexion</Text>
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
                <TouchableOpacity style={styles.login} onPress={() => Authentication()}>
                    <Text style={{color: "white", textTransform: "uppercase"}}>Se connecter</Text>
                </TouchableOpacity>
                <View style={{width: w / 1.1, height: 2, backgroundColor: "#3434346b", marginTop: 10}}></View>
                <View style={{width: w / 1.1,flexDirection: "column"}}>
                <Text style={{color: "white", marginTop: 20, fontSize: 20, textTransform: "uppercase", marginBottom: 20}}>Pas encore de compte ? </Text>
                <TouchableOpacity style={{ backgroundColor: "#6f00f8", borderRadius: 5, borderWidth: 1, borderColor: "#6402dd"}} onPress={() => navigation.navigate('Register')}>
                <Text style={{color: "white",textTransform: "uppercase", padding: 20, fontWeight: "bold"}}>S'inscrire</Text>
                </TouchableOpacity>
                </View>
            </View>
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
          marginBottom: 10,
          textTransform: "uppercase",
          fontWeight: "bold"

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