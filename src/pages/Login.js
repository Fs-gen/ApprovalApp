import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { ButtonCom } from '../components/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const goLogin = async () => {
        console.log('form: ', username);

        //  fetch http://localhost:3000/user
        const res = await fetch('http://192.168.35.160:3000/user')
        const data = await res.json()
        const sukses = data.filter(item => item.username === username && item.password === password)
        if (sukses.length > 0) {
            Alert.alert('Sukses', 'Login Berhasil')
            // simpan ke async storage
            await AsyncStorage.setItem('user', JSON.stringify(sukses[0]))
        } else {
            Alert.alert('Gagal', 'Login Gagal')
        }
    }

    const readAsyncStorage = async () => {
        //read data async storage
        const res = await AsyncStorage.getItem('user')
        if (res) {
            navigation.replace('Home')
        }
    }


    useEffect(() => {
        //read data async storage
        readAsyncStorage()
        // console.log();
    }, [])

    return (
        <>
            <View style={styles.container}>
                <View style={{
                    alignItems: 'center',

                }}>

                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#009387'
                    }}>Login</Text>

                </View>
                <View style={{
                    marginHorizontal: 40,
                    marginTop: 20

                }}>
                    <Text style={styles.label}>Username</Text>
                    <View >
                        <TextInput
                            placeholder="Username"
                            style={styles.input}
                            value={username}
                            onChangeText={val => setUsername(val.trim())}
                        />
                    </View>

                    <View style={{
                        height: 20
                    }} />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={val => setPassword(val.trim())}
                    />
                    <View style={{
                        height: 20
                    }} />
                    <Button onPress={() => goLogin()} title="Login" />

                </View>

            </View>
        </>

    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: '#FFF',
    },
    label: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5

    }
    ,
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#000',
        paddingHorizontal: 15,
    }

})