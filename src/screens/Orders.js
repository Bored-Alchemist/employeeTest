

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { height, width } from '../assets/dimensions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast, getOrders} from '../action/auth';
import Header from '../components/Header';

 const Orders = ({ type, navigation, getOrders }) => {
const [orders, setOrders] = useState([])
  useEffect(()=>{
      fetchOrder()
  },[])
  const fetchOrder = async () => {
      const user = await AsyncStorage.getItem('user');
      const response = await getOrders({
          cust_id: JSON.parse(user).cust_id,
          org_id: JSON.parse(user).org_name
      });
      console.log('orders ==+++++++++>', response);
      if(response.success) {
          setOrders(response.data)
      }
  }
    return (
       <>
        <ScrollView style={{
            flex: 1
        }}>
            <Header image={true} navigation={navigation} />

<View style={{paddingHorizontal:30, paddingVertical:30}}>
    <Text style={{fontSize:24, fontWeight:'500', letterSpacing:1}}>Orders</Text>
</View>
<View style={styles.card}>
    <View style={{display:'flex', flexDirection:'row',flex:1, borderBottomColor:'lightgrey',borderBottomWidth:1,backgroundColor:'white',borderTopRightRadius:15, borderBottomRightRadius:15,elevation:4, padding:20 }}>
                        {/* <View style={{paddingHorizontal:10,paddingVertical:10,}}>
                            <Image source={{ uri: 'http://food.breeur.in/'+item.menu_img }} style={{height:60, width:60, borderRadius:10}} />
                        </View> */}
                        {/* <View style={{flex:1, marginLeft:20,paddingHorizontal:10,paddingVertical:10,}}> */}
                        <Text style={{fontWeight:'bold', flex:1}}>
                                Name
                            </Text>
                            <Text style={{flex:1}}>
                                Count
                            </Text>
                            <Text style={{flex:1}}>
                                Calorie
                            </Text>
                            <Text style={{flex:1}}>
                                Amount
                            </Text>
                            <Text style={{flex:1}}>
                                Status
                            </Text>
                        {/* </View> */}
                        

                    </View>
    </View>
            {orders && orders.length > 0 && orders.map((item,index) =>
        <View key={index} style={styles.card}>
    <View style={{display:'flex', flexDirection:'row',flex:1, borderBottomColor:'lightgrey',borderBottomWidth:1,backgroundColor:'white',borderTopRightRadius:15, borderBottomRightRadius:15,elevation:4, padding:20 }}>
                        {/* <View style={{paddingHorizontal:10,paddingVertical:10,}}>
                            <Image source={{ uri: 'http://food.breeur.in/'+item.menu_img }} style={{height:60, width:60, borderRadius:10}} />
                        </View> */}
                        {/* <View style={{flex:1, marginLeft:20,paddingHorizontal:10,paddingVertical:10,}}> */}
                        <Text style={{fontWeight:'bold', flex:1.5}}>
                                {item.itemname}
                            </Text>
                            <Text style={{flex:1}}>
                                {item.itemcount}
                            </Text>
                            <Text style={{flex:1}}>
                                {item.cal_count}
                            </Text>
                            <Text style={{flex:1}}>
                                {item.amount}
                            </Text>
                            <Text style={{flex:1}}>
                                {item.status == '' ? 'Order Placed' : item.status}
                            </Text>
                        {/* </View> */}
                        

                    </View>
    </View>
    
    )}

    {orders && orders.length <= 0 && 
        <Text style={{fontSize:18, paddingHorizontal:0, textAlign:'center', paddingVertical:40, fontWeight:'bold',letterSpacing:1}}>
            No Orders Found!
        </Text>}
            </ScrollView>
       
    </>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        paddingHorizontal: width * 0.04,
        backgroundColor: 'white',
        elevation: 4,
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
        showToast, getOrders
    }
) (Orders)