import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Approval from './pages/Approval';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Home from './pages/Home';
import ApprovalDetail from './pages/ApprovalDetail';



const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" options={{
                    headerShown: false
                }} component={SplashScreen} />
                <Stack.Screen name="Home" options={{
                    headerShown: false
                }} component={Home} />
                <Stack.Screen name="Approval" component={Approval} />
                <Stack.Screen name="ApprovalDetail" component={ApprovalDetail} />
                <Stack.Screen options={{
                    headerShown: false
                }} name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;