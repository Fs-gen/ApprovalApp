import React, {
    useEffect
} from "react";

import { View, Text, StyleSheet, Image, StatusBar, TouchableHighlight } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

    const readAsyncStorage = async () => {
        //read data async storage
        const res = await AsyncStorage.getItem('user')
        if (res) {
            navigation.replace('Home')
        } else {
            navigation.replace('Login')
        }
    }
    useEffect(() => {
        setTimeout(() => {

            readAsyncStorage()

        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle="light-content" />
            <View style={styles.header}>

                <Text style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 30

                }}>Approval App</Text>
            </View>

        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009387"
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },

});
