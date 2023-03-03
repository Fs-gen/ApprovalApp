import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Approval = ({ navigation, route }) => {
    const { category } = route.params;
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [total, setTotal] = useState(0);
    const [sort, setSort] = useState(true);
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
        const res = await fetch('http://192.168.35.160:3000/employees?category=' + category)
        const datas = await res.json()
        console.log(datas);
        setData(datas)
    }

    const search = async (text) => {
        const res = await fetch('http://192.168.35.160:3000/employees?name_like=' + text)
        const datas = await res.json()
        if (datas.length === 0) {
            alert('Data Not Found')
        }
        else {
            setData(datas)
        }

    }

    const sortByName = async (text) => {
        setSort(!sort)
        const res = await fetch('http://192.168.35.160:3000/employees?name_like=' + text + '&_sort=name&_order=' + (sort ? 'asc' : 'desc') + '_page=' + page + '&_limit=' + limit)
        const datas = await res.json()
        if (datas.length === 0) {
            alert('Data Not Found')
        }
        else {
            setPage(1 + 1)
            setData(datas)
        }

    }

    useEffect(() => {
        getData()
        readAsyncStorage()
    }, [isFocused])
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 20
        }}>
            <View style={{ marginBottom: 10 }}>
                <TextInput placeholder="Search"
                    style={styles.input}
                    keyboardType="web-search"
                    onChangeText={(text) => setKeyword(text)}
                />
                <Button title="Search" onPress={() => search(keyword)} />
            </View>
            <View style={{ marginBottom: 10 }}>
                <Button title="Sort By Name" onPress={() => sortByName(keyword)} />
            </View>

            <Text style={styles.label}>List Reimbursement</Text>

            {
                data?.map((item, index) => {
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
                }
                )
            }


            {/* next page  */}
            <View style={{ marginBottom: 10 }} />
            <Button color={"green"} title="Next Page" onPress={() =>
                sortByName(keyword)
            } />
            <View style={{ marginBottom: 40 }} />


        </ScrollView>
    );
}

const styles = StyleSheet.create({

    cardText: {
        color: '#000',

    },
    label:
    {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 20

    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#000',
        paddingHorizontal: 15,
        marginBottom: 10
    }
})

export default Approval;
