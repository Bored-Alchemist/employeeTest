import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Image, Text, Modal, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { height, width } from '../assets/dimensions';
import {light_grey} from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

 const Header = ({ image, back, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const logoutUser = async () => {
        setModalVisible(false);
        AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('loggedIn');
        navigation.navigate('Login');
    }
    return (
        <View style={styles.main}>
            <View style={styles.start}>
              <TouchableOpacity onPress={() => navigation.navigate('Venderlist')}>
                <Image source={require('../assets/pngs/Logo02.png')} style={{height: 30}} resizeMode='contain'/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: "flex-end", flexDirection: 'row'}}>
              <View style={{...styles.end, width: 60}}>
                <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                  <Image source={require('../assets/pngs/Icon03.png')} style={{height: 30}} resizeMode='contain'/>
                </TouchableOpacity>
              </View>
              <View style={{...styles.end, width: 50}}>
                <TouchableOpacity>
                  <Image source={require('../assets/pngs/Icon02.png')} style={{height: 23}} resizeMode='contain'/>
                </TouchableOpacity>
              </View>
            </View>


            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>

            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center', display:'flex',flexDirection:'row'}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#4caf50" }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#f44336" }}
              onPress={() => {
                logoutUser();
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.025,
        backgroundColor: "#f0f0f0",
        elevation: 4,
        paddingVertical: height * 0.01,
        height: height * 0.07
    },
    start: {
        alignItems: 'center',
        width: 125,
        justifyContent: 'center'
    },
    end: {
        alignItems: 'center',
        justifyContent:'center',
        alignContent:'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flex:1,
        margin:10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default Header;