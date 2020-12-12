import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import Navigation from './src/navigation/Navigation';
import { Provider } from "react-redux";
import store from "./src/store";
import Alert from './src/components/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isuser, setUser] = useState(false)
  useEffect(() => {
      isLoggedIn();
  },[]);

    const isLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');
      
      if(user) {setUser(true);console.log('user =+++++>', user);}
      setLoading(true);
    }
    
  return (
    <>
     <Provider store={store}>
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={{ flex: 1 }}>
      {loading && <Navigation isLoggedIn={isuser} />}
  <Alert />
  </View>
  </SafeAreaView>
  </Provider>
   </>
  );
};


export default App;
