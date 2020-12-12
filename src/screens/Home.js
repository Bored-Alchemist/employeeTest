import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler, TouchableHighlight, Alert } from 'react-native';
import { red } from '../assets/colors';
import Header from '../components/Header';
import CategorySection from '../components/CategorySection';
import { height, width } from '../assets/dimensions';

const Home = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          console.log('closed')
          backHandler.remove();
        };
      }, []);

      function handleBackButtonClick() {
        console.log('clicked')
        navigation.goBack()
        return true;
    }

    return (
        <>
        <ScrollView style={{
            flex: 1,
            backgroundColor: "white"
        }}>
            <Header image={true} navigation={navigation} />
            <View style={{flex: 1, margin: 20, marginTop: 30}}>
              <Text style={{fontSize: 20, fontWeight: "bold"}}>Hungry?</Text>
              <Text style={{fontSize: 16}}>Order & Eat</Text>
            </View>
            <CategorySection navigation={navigation} />
            
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height:height,
        backgroundColor: "white"
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


const mapStateToProps = state => ({

})


export default Home