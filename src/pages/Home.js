import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    const readAsyncStorage = async () => {

        //read data async storage
        const res = await AsyncStorage.getItem('user')
        if (res) {
            setUser(JSON.parse(res))
        } else {
            navigation.replace('Login')
        }
    }
    const getData = async () => {
        const res = await fetch('http://192.168.35.160:3000/employees')
        const datas = await res.json()
        console.log(datas);
        setData(datas)
    }

    useEffect(() => {
        readAsyncStorage()
        getData()
    }, [isFocused])

    return (
        <ScrollView style={{
            backgroundColor: '#fff',
            flex: 1,
            padding: 10,
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
                marginVertical: 20
            }}>Welcome, {user?.name}</Text>
            <View>
                <Text style={styles.label}>Category</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Approval', {
                        category: 'medical'
                    })} style={styles.category}>
                        <Text style={styles.text}>Medical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Approval', {
                        category: 'transport'
                    })} style={styles.category}>
                        <Text style={styles.text}>Transport</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Approval', {
                        category: 'optical'
                    })} style={styles.category}>
                        <Text style={styles.text}>Optical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Approval', {
                        category: 'dental'
                    })} style={styles.category}>
                        <Text style={styles.text}>Dental</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.label}>History Reimbursement</Text>

                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('ApprovalDetail', {
                                id: item.id
                            })} style={{
                                backgroundColor: '#fff',
                                padding: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#009387',

                                marginBottom: 10
                            }} key={index}>
                                <Text style={styles.cardText}>Name : {item.name}</Text>
                                <Text style={styles.cardText}>Category: {item.category}</Text>
                                <Text style={styles.cardText}>Status: {item.status}</Text>

                            </TouchableOpacity>
                        )
                    })
                }


            </View>
        </ScrollView>
    );
}


export default Home;

const styles = StyleSheet.create({
    category: {
        width: 80,
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: '#009387',
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    }
    , label:
    {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 20

    }
    , cardText: {
        color: '#000',

    }
})