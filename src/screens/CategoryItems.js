import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, ScrollView, BackHandler } from 'react-native';
import { height, width } from '../assets/dimensions';
import Menu from '../components/Menu';
import Header from '../components/Header';
import {listOfFoods} from '../action/auth';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../components/Loader';

 const CategoryItems = ({ image, back, navigation, listOfFoods }) => {
     const [menus, setMenus] = useState([]);
     const [thali, setThali] = useState([]);
     const [menu, isMenu] = useState(true);
     const [loading, isLoading] = useState(true);

     useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          backHandler.remove();
        };
      }, []);

      function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

     useEffect(()=>{
         fetchItems()
     },[]);

     const fetchItems = async () => {
        const response = await listOfFoods({
            cust_id: '1',
            org_id: '1'
        });
        if(response.success) {
            // success
            console.log(response);
            setMenus(response.menudata);
            setThali(response.thalidata);
            isLoading(false);
        }
     }

    return (
        <>
        {loading && <Loader />}
        {!loading &&  <ScrollView style={{
            flex: 1
        }}>
            
            {!loading && 
            <Header image={true} navigation={navigation} />
 }
       {!loading &&  <View style={styles.main}>
            <View style={{flex:1,backgroundColor:'#E5E5E5',borderRadius:30}}>
                <ImageBackground source={require('../assets/Mask.png')} style={{height:height*0.3}} imageStyle={{borderRadius:30}}>
                    <View style={{backgroundColor:'rgba(255, 0, 0, 0.5)', width:width*0.5, justifyContent:'flex-end', alignContent:'flex-end', alignItems:'flex-start', position:'absolute', top:'70%', marginLeft:20, borderBottomLeftRadius:10}}>
                        <Text style={{color:'white', fontSize:24, fontWeight:'bold', paddingStart:10}}>
                            Lorem Ipsum
                        </Text>
                        <Text style={{color:'white', fontSize:18, letterSpacing:2, paddingStart:10}}>
                            Scfnfjen
                        </Text>
                    </View>
                </ImageBackground>
            </View>

        </View>
 }
       {!loading &&   <View style={{// display:'flex',
        flexDirection: 'row',
        // paddingHorizontal: width * 0.04,
        backgroundColor: 'white',
        // elevation: 4,
        paddingVertical: height * 0.015,
        borderBottomColor:'lightgrey',
        borderBottomWidth:2}}>
        <View style={{flex:1, justifyContent:'center', alignContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>isMenu(true)} >
        <Text style={{color:menu ? '#ED2124' : 'black', paddingTop:5,paddingBottom:5, paddingEnd:15, paddingStart:15, borderRadius:200,}}>
                Menu
            </Text>
        </TouchableOpacity>
        </View>
        <View style={{flex:1, justifyContent:'center', alignContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>isMenu(false)} >
            <Text style={{color:!menu ? '#ED2124' : 'black'}}>
                Thali 
            </Text>
        </TouchableOpacity>
        </View>
    </View>

 }
    {menu &&  !loading && <Menu type="menu" data={menus} />}

    
    {!menu && !loading && <Menu type="thali" data={thali} />}
 
        </ScrollView>}
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        paddingHorizontal: width * 0.04,
        backgroundColor: '#FCF8F8',
        // elevation: 4,
        paddingVertical: height * 0.015,
        
        
    },
    start: {
        alignItems: 'flex-start',
        flex: 0.3,
        justifyContent:'center'
    },
    end: {
        alignItems: 'flex-end',
        flex: 2
    },
    card: {
        
        paddingHorizontal: 20,
        paddingVertical: 5
    }
})

const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        listOfFoods
    }
) (CategoryItems)