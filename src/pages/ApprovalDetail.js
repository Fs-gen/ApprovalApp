import React, {
    useState, useEffect
} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const ApprovalDetail = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const { id } = route.params;

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
        const res = await fetch('http://192.168.35.160:3000/employees/' + id)
        const datas = await res.json()
        console.log(datas);
        setData(datas)
    }

    const approve = async () => {
        // Put data 
        const newdata = {
            ...data,
            status: 'Approved',
        };
        const res = await fetch('http://192.168.35.160:3000/employees/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newdata),
        })

        const datas = await res.json()
        setData(datas)
    }

    const reject = async () => {
        // Put data only status 
        const newdata = {
            ...data,
            status: 'Rejected',
        };

        const res = await fetch('http://192.168.35.160:3000/employees/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newdata),
        })

        const datas = await res.json()
        setData(datas)
    }

    useEffect(() => {
        console.log(id);
        readAsyncStorage()
        getData()
    }, [isFocused])

    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1,
            padding: 10,
        }}>
            <View style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#009387',
                marginBottom: 10
            }}>
                <Text style={styles.cardText}>No : {data?.number}</Text>
                <Text style={styles.cardText}>Name : {data?.name}</Text>
                <Text style={styles.cardText}>Claim Date : {data?.claimDate}</Text>
                <Text style={styles.cardText}>Claim Amount : {data?.amount}</Text>
                <Text style={styles.cardText}>Claim Description :  {data?.desc}</Text>
                <Text style={styles.cardText}>Category:  {data?.category}</Text>
                <Text style={styles.cardText}>Status:  {data?.status}</Text>


            </View>
            <View style={{ height: 30 }} />
            <Button title="Approve" onPress={() => approve()} />
            <View style={{ height: 20 }} />
            <Button title="Reject" color={"red"} onPress={() => reject()} />
        </View>
    );
}

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

export default ApprovalDetail;
