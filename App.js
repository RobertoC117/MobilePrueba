import React,{useState, useEffect, useMemo} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaView, ToastAndroid, View } from 'react-native';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';

import { TOKEN, ACCESS_TOKEN } from './src/utils/constants';
import { getToken, removeToken, setToken } from './src/api/token';
import {deteleCart} from './src/api/cart'
import { deleteHistory } from './src/api/history';
import { androidClientId, } from './src/utils/constants'
import AuthContext from './src/context/AuthContext'
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {

  const [auth, setAuth] = useState(undefined)
  
  useEffect(()=>{
      (async()=>{
        // await removeToken(TOKEN)
        const token = await getToken(TOKEN)
        const accessToken = await getToken(ACCESS_TOKEN)
        console.log("Token", token)
        if(token){
          setAuth({
            token,
            accessToken: accessToken || null
          })
        }else{
          setAuth(null)
        }
        console.log("UseEffect App.js")
      })()
  }, [])

  const theme = {
    ...DefaultTheme,
    roundness: 15,
    colors:{
      ...DefaultTheme.colors,
      primary:"#103F6E",
      accent:"#175CA1",
    }
  }

  const login = (userInfo) =>{

    setToken(userInfo.token, TOKEN)

    if(userInfo.accessToken)
        setToken(userInfo.accessToken, ACCESS_TOKEN)

    setAuth({
      token:  userInfo.token,
      accessToken: userInfo.accessToken ? userInfo.accessToken : null
    })

  }
  
  const logout = async() => {
    if(auth){
      try {
        if(auth.accessToken){
          await removeToken(ACCESS_TOKEN)
          await Google.logOutAsync({accessToken: auth.accessToken, androidClientId})
        }
        await removeToken(TOKEN)
        await deteleCart()
        await deleteHistory()
        setAuth(null)
      } catch (error) {
        ToastAndroid.showWithGravity("Error al cerrar sesion", ToastAndroid.LONG, ToastAndroid.CENTER)
      }
    }
  }

  const authData = useMemo(()=>({
        auth,
        login,
        logout,
  }), [auth])

  if(auth === undefined) return null

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider theme={theme}>
        <View style={{paddingTop: Constants.statusBarHeight}}>
          <StatusBar statusBarStyle="light-content" backgroundColor="#103F6E" style="light" />
        </View>
          {/* <AuthScreen/> */}
          {/* <AppNavigation/> */}
          <MainNavigation/>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
