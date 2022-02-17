import { View, Text, Dimensions, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LikeContext } from './context/LikeContext'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Data from '../Data'
import { set } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native'

const Favorie = () => {
  const { liked } = useContext(LikeContext);
  const [favorieList, setFavorieList] = useState([]);

  const filterFavorie = () => {
    const result = Data.filter(fav => liked.includes(fav.key))
    setFavorieList(result);
  }

  useEffect(() => {
    filterFavorie()
  }, [liked]);

  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;


  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#6851ff", height: 150, width: "100%", display: "flex" }}>
        <Text style={{ bottom: 0, position: "absolute", marginLeft: 10, fontWeight: "bold", color: "white", fontSize: 30, padding: 10 }}>Favorie</Text>
      </View>
      {liked.length < 1 ? (
        <View style={{ flex: 1, display: "flex", alignItems: 'center', width: "100%", justifyContent: "center"}}>
      <Text>Vous n'avez pas de manga en favorie</Text>
      </View>
      ) : (
        <View style={{ width: "100%", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FlatList
            data={favorieList}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Details'), {item: item}}>
                <View style={{ width: w / 3 - 10, height: 250, display: "flex", alignItems: "center", marginTop: 10, marginBottom: 20, flexDirection: "column" }}>
                  <Image style={{
                    width: w / 3 - 20,
                    height: 250,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderRadius: 5,
                    resizeMode: 'cover',
                  }} source={{ uri: item.img }} />
                  <Text style={{
                    padding: 10
                  }}>{item.title.substring(0, 15)}</Text>
                </View>
              </TouchableOpacity>
            )} />
        </View>
      )}
    </View>
  )
}

export default Favorie