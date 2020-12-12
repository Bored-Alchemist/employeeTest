import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Button from '../components/Button';
import { height, width } from '../assets/dimensions';
import {createOrder} from '../action/auth';
import { connect } from 'react-redux';

const Cart = ({ navigation, createOrder }) => {
    const [item, setItem] = useState([]);
    const [deliveryAmount, setTotalPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

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
        showCart();
    },[])

    const showCart = async () => {
        const isExist = await AsyncStorage.getItem('cart');
        if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
            setItem(JSON.parse(isExist));
            let v_amount = 0;
            JSON.parse(isExist).map(v => {
                v_amount = v_amount + (parseInt(v.dish_price) * v.quantity);
            });
            setSubTotal(v_amount)
        } else {
            setSubTotal(0)
            setItem([]);
        }
    }

    const addToCart = async (item) => {
        const isExist = await AsyncStorage.getItem('cart');
        if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
            let itemExists = JSON.parse(isExist).find(v => (item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id );
            if(itemExists) {
                let items = JSON.parse(isExist).map(v => ((item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id) ? {...v, quantity: v.quantity + 1} : v );
                AsyncStorage.setItem('cart', JSON.stringify(items));
            } else {
                AsyncStorage.setItem('cart', JSON.stringify([...JSON.parse(isExist),{...item,quantity: 1, type:item.type, item_id: item.type == 'menu' ? item.menuid : item.thali_id }]));
            }
        }
        showCart()
    }

    const removeItem = async (item) => {
        const isExist = await AsyncStorage.getItem('cart');
        if(item.quantity > 1) {
            if(JSON.parse(isExist) && JSON.parse(isExist).length > 0) {
                let itemExists = JSON.parse(isExist).find(v => (item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id );
            if(itemExists) {
                let items = JSON.parse(isExist).map(v => ((item.type == 'menu') ? v.item_id ==  item.menuid : v.item_id == item.thali_id) ? {...v, quantity: v.quantity - 1} : v );
                AsyncStorage.setItem('cart', JSON.stringify(items));
                
            }
            }
        } else {
                let itemExists = JSON.parse(isExist).filter(v => (item.type == 'menu') ? v.item_id !=  item.menuid : v.item_id != item.thali_id );
                AsyncStorage.setItem('cart', JSON.stringify(itemExists));
            console.log(itemExists)
        }
        showCart();
    }
    
    const pay = async () => {
        let user = await AsyncStorage.getItem('user');
        if(item && item.length > 0) {
            let foodname = [];
            let dishcount = [];
            item.map((v,index) => {
                foodname.push( v.item_id);
                dishcount.push(v.quantity);
            });

            const response = await createOrder({foodname, dishcount, totalprice: deliveryAmount + subTotal, cust_id: JSON.parse(user).cust_id});
            console.log('api response ==++++++++++>',response);
        if(response.success) {
            AsyncStorage.removeItem('cart');
            navigation.navigate('OrderSuccess')
        }
        }
        // navigation.navigate('OrderSuccess')
        
    }

    return (
        <>
        <ScrollView style={{
            flex: 1,
            backgroundColor:'#FCF8F8'
        }}>
            <Header image={true} navigation={navigation} />
           
            <View style={styles.deliveryAddress}>
                <View style={styles.deliveryDurationContainer}>
                    <Text style={{flex:1}}>
                        Delivery time
                    </Text>
                    <Text>
                        Today, 10:00 AM  >
                    </Text>
                </View>
                <View style={{display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:20, }}>
                    <Image source={require('../assets/marker.png')} style={{justifyContent:'center', alignContent:'center'}} />
                    <Text style={{flex:0.9, marginLeft:10}}>
                        Akshya nagar 1st block 1st, Cross Rammurthi nagar, Banglore - 560016
                    </Text>
                    <Text style={{fontSize:20,flex:0.1, textAlign:'right'}}>
                        >
                    </Text>
                </View>
            </View>







            <View style={{...styles.deliveryAddress, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
            
            
            
            {item && item.length > 0 && item.map((cart, index) => 
            <View key={index} style={{display:'flex', flexDirection:'row',flex:1,marginLeft:0,  marginRight:0, marginTop:5 }}>
                        <View style={{}}>
                            <Image source={{ uri: 'http://food.breeur.in/'+cart.menu_img }} style={{height:60, width:60, borderRadius:10}} />
                        </View>
                        <View style={{flex:1, marginLeft:20,}}>
                            <Text style={{fontWeight:'bold'}}>
                                {cart.type=='menu'?cart.dish_name : cart.thali_name}
                            </Text>
                            <Text style={{color:'grey'}}>
                                {cart.type=='menu'?cart.menu_category: cart.dish_include}
                            </Text>
                            <View style={{display:'flex', flexDirection:'row',}}>
                                <Text style={{flex:1}}>
                                    Rs. {parseInt(cart.dish_price) * cart.quantity}
                                </Text>
                                <View style={{display:'flex', flexDirection:'row',}}>
                                    <TouchableOpacity onPress={()=>removeItem(cart)}>
                                        <Image source={require('../assets/minus.png')} style={{}} />
                                    </TouchableOpacity>
            <Text style={{marginLeft:10, marginRight:10}}>{cart.quantity}</Text>
                                    <TouchableOpacity onPress={()=>addToCart(cart)}>
                                        <Image source={require('../assets/plus.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </View>
            )}




                        <View style={{paddingVertical:20, marginBottom:50}}>
                            <View style={{display:'flex', flexDirection:'row',}}>
                                <Text style={{fontSize:16, flex:1}}>
                                    Sub Total
                                </Text>
                                <Text>
                                    Rs. {subTotal}
                                </Text>
                            </View>
                            <View style={{display:'flex', flexDirection:'row',}}>
                                <Text style={{fontSize:16, flex:1}}>
                                    Delivery Fee
                                </Text>
                                <Text>
                                    Rs. {deliveryAmount}
                                </Text>
                            </View>
                            <View style={{display:'flex', flexDirection:'row',}}>
                                <Text style={{fontWeight:'bold', fontSize:16, flex:1}}>
                                    Total
                                </Text>
                                <Text>
                                    Rs. {subTotal + deliveryAmount}
                                </Text>
                            </View>
                        </View>
            </View>
        </ScrollView>
        <ScrollView style={{flex:1,position:'absolute', backgroundColor:'white', height:height*0.1,width:width-1, borderTopRightRadius:20, borderTopLeftRadius:20, top:'90%',elevation:4}}>
                <View style={{display:'flex', flexDirection:'row', paddingVertical:10, paddingVertical:10,justifyContent:'center', alignItems:'center', alignContent:'center',}}>
                <View style={{display:'flex', flexDirection:'row',paddingHorizontal:10,paddingVertical:10}}>
                                <View style={{flex:0.8}}>
                                    <Text style={{fontWeight:'bold', fontSize:16, }}>
                                        Total: Rs. {subTotal + deliveryAmount}
                                    </Text>
                                    <Text style={{ fontSize:16, color:'grey'}}>
                                        {item.length} items
                                    </Text>
                                </View>
                                <View style={{flex:0.3}}>
                                    <Button label="Pay" bgColor="#B50019" textColor="white" clickEvent={()=>pay()}  />
                                </View>
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
        paddingVertical:10,
        paddingHorizontal:20,
        elevation:4,
        margin:20,
        borderRadius:6
    },
    deliveryDurationContainer: {
        display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:20,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    }
})


const mapStateToProps = state => ({

})


export default connect(
    mapStateToProps, {
        createOrder
    }
) (Cart)