import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { height, width } from '../assets/dimensions';
import { dark_grey } from '../assets/colors';

 const Button = ({ label, clickEvent, bgColor, textColor }) => {
    return (
       <TouchableOpacity style={styles.button} onPress={clickEvent}>
           <Text style={{ color: textColor?textColor:'white', fontSize: 16, fontWeight: 'bold' }}>
                {label}
           </Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        paddingTop:10,
        paddingBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a00030'
    }
})

export default Button