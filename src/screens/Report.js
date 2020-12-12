import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ToastAndroid, BackHandler, ImageBackground } from 'react-native';
import { red } from '../assets/colors';
import Header from '../components/Header';
import Button from '../components/Button';
import { height, width } from '../assets/dimensions';
import Input from '../components/Input';

const Report = ({ navigation }) => {
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

    return (
        <>
        <ScrollView style={{
            flex: 1,
            backgroundColor:'#FCF8F8'
        }}>
            <Header image={true} navigation={navigation} />
                <View style={{paddingVertical:0, paddingHorizontal:20}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>
                        Report
                    </Text>
                </View>
            <View style={styles.deliveryAddress}>
                
                <View style={styles.deliveryDurationContainer}>
                    <Text style={{flex:1, fontSize:18, fontWeight:'bold'}}>
                        Salshddkfan;j
                    </Text>
                    
                </View>
                <View style={{display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:20, }}>
                    
                    <Text style={{flex:1}}>
                        Akshya nagar 1st block 1st, Cross Rammurthi nagar, Banglore - 560016
                    </Text>
                   
                </View>
            </View>



            <View style={styles.deliveryAddress}>
                
                <View style={styles.deliveryDurationContainer}>
                    <Text style={{flex:1, fontSize:18, fontWeight:'bold'}}>
                        Salshddkfan;j
                    </Text>
                    
                </View>
                <View style={{display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:20, }}>
                    
                    <Text style={{flex:1}}>
                        Akshya nagar 1st block 1st, Cross Rammurthi nagar, Banglore - 560016
                    </Text>
                   
                </View>
            </View>
        <View style={styles.inputContainer}>
            <View style={{marginTop:20}}>
                    <Input name='password' secureTextEntry={false} placeholder="How can we help you"  />
            </View>
            <View style={{marginTop:20}}>
                    <Input name='password' secureTextEntry={false} placeholder="Name"  />
            </View>
            <View style={{marginTop:20}}>
                    <Input name='password' secureTextEntry={false} placeholder="Email"  />
            </View>
            <View style={{marginTop:20}}>
                    <Input name='password' secureTextEntry={false} placeholder="Phone Number"  />
            </View>
            <View style={{marginTop:20}}>
                    <Input name='password' secureTextEntry={false} placeholder="Message"  />
            </View>
            <View style={{marginTop:20}}>
                <Button label="Send Message" bgColor="#B50019" textColor="white" clickEvent={()=>navigation.navigate('Home')} />
            </View>
        </View>


        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height:height
    },
    deliveryAddress: {
        backgroundColor:'white',
        paddingVertical:0,
        paddingHorizontal:10,
        elevation:4,
        margin:20,
        borderRadius:6
    },
    deliveryDurationContainer: {
        display:'flex',
        flexDirection:'row',
        paddingVertical:5,
        paddingHorizontal:20,
    },
    inputContainer: {
        paddingHorizontal:20,
        paddingVertical:0
    }
})


const mapStateToProps = state => ({

})


export default Report