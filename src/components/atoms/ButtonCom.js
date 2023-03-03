import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const ButtonCom = ({ onPress, text }) => {
    return (
        <TouchableHighlight onPress={() => onPress}>
            <View style={{
                backgroundColor: '#009387',
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20
                }}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({})

export default ButtonCom;
