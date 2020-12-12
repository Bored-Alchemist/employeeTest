import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler, ImageBackground } from 'react-native';
import Header from '../components/Header';
import {getCalories} from '../action/auth';
import { height, width } from '../assets/dimensions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const Health = ({ navigation, getCalories }) => {
    const [cal, setCal] = useState(0)
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
        fetchCalories()
    },[])

    const fetchCalories = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        console.log({cust_id: user.cust_id, org_id: user.org_name});
        const response = await getCalories({cust_id: user.cust_id});
        if(response.success) {
            console.log(response);
            setCal(response.data[0])
        }
        isLoading(false);
    }
    return (
        <>
        {loading && <Loader />}
        {!loading && <ScrollView style={{
            flex: 1
        }}>
            <Header image={true} navigation={navigation} />
            <View style={{justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start', marginTop:24}}>
                <Text style={{fontSize:24, fontWeight:'700', marginLeft:20,letterSpacing:2}}>
                    Calories
                </Text>
            </View>

            <ImageBackground source={require('../assets/healthBox.png')} style={{height:200, margin:20, display:'flex', flexDirection:'row',justifyContent:'center', alignContent:'center',alignItems:'center'}} imageStyle={{borderRadius:30}}>
                <View style={{justifyContent:'center', alignContent:'center',alignItems:'center',}}>
                    <Text style={{color:'white', fontSize:50, fontWeight:'bold'}}>
                        {cal ? cal : 0}
                    </Text>
                    {/* <Image source={require('../assets/circle.png')} /> */}
                </View>
                {/* <View style={{justifyContent:'center', alignContent:'center',alignItems:'flex-start',marginLeft:30}}>
                    <Text style={{fontSize:25, fontWeight:'bold', color:'white'}}>
                        Dslrgilkgn
                    </Text>
                    <Text style={{fontSize:20,  color:'white'}}>
                        gsrlhtj;hld;
                    </Text>
                </View> */}
            </ImageBackground>
            
            {/* <View style={{justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start', marginTop:0}}>
                <Text style={{fontSize:24, fontWeight:'700', marginLeft:20,letterSpacing:2}}>
                    FElkeak
                </Text>
            </View>

            <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}}>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/rectangleCard.png')} />
                </View>
               
            </ScrollView>
 */}



            {/* <View style={{justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start', marginTop:0}}>
                <Text style={{fontSize:24, fontWeight:'700', marginLeft:20,letterSpacing:2}}>
                    Csdmvsk
                </Text>
            </View>
            <ScrollView style={{flex:1}} horizontal={true}>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/smallCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/smallCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/smallCard.png')} />
                </View>
                <View style={{paddingLeft:10, paddingVertical:20}}>
                    <Image source={require('../assets/smallCard.png')} />
                </View>
               
            </ScrollView>
         */}
        
        </ScrollView>}
        </>
       
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height:height
    },
    logoContainer: {
        flex: 0.8,
        // height: height * 0.1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: height*0.25
    },
    formContainer: {
        flex: 1.4,
        // height: height * 0.45,
        paddingHorizontal: width * 0.07,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8
    }
})


const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        getCalories
    }
) (Health)