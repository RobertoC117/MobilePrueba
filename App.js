import React,{useState, useEffect, useMemo} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import AuthScreen from './src/screens/Auth';
import AuthContext from './src/context/AuthContext'
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {

  const [auth, setAuth] = useState(undefined)
  const [options, setOptions] = useState({initialRouteName: "login"})

  useEffect(()=>{

  }, [])

  const theme = {
    ...DefaultTheme,
    //roundness: 15,
    colors:{
      ...DefaultTheme.colors,
      primary:"#103F6E",
      accent:"#175CA1",
    }
  }

  const login = (userInfo) =>{
    //Aqui se setea el token
    setAuth({
      token:  userInfo.token
    })
  }
  
  const logout = () => {
    if(auth)
    setAuth(null)
    //Aqui se elimina el token
  }
  
  const configure = (newSettings) =>{
    setOptions({...options, newSettings})
    //Aqui se setea la configuracion
  }

  const authData = useMemo(()=>({
        auth,
        options,
        login,
        logout,
        configure
  }), [auth])

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider theme={theme}>
          <StatusBar style="auto" />
          {/* <AuthScreen/> */}
          {/* <AppNavigation/> */}
          <MainNavigation/>
      </PaperProvider>
    </AuthContext.Provider>
  );
}
