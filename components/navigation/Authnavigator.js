import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENT 
import Login from '../Login'
import Register from '../Register'

export default function Authnavigator() {
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false
          }}>
            <AuthStack.Screen name="Login" component={Login} />
            {/* <AuthStack.Screen name="Tabnavigator" component={Tabnavigator} /> */}
            <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
    )
}

const AuthStack = createStackNavigator();