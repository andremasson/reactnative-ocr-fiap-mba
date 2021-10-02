import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConfigComponent from './app/components/ConfigComponent/ConfigComponent';
import CameraComponent from './app/components/CameraComponent/CameraComponent';
import ReceiptComponent from './app/components/ReceiptsComponent/ReceiptsComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import appStyles from './app/styles';

const Tab = createBottomTabNavigator();


export default function App() {

    const screenOptions = {
    
    };
    
    return (
        <Provider store={store}>

            <NavigationContainer>
                <ConfigComponent />
                <Tab.Navigator screenOptions={screenOptions}>

                    <Tab.Screen 
                        name="Recibos" 
                        component={ReceiptComponent} 
                        options={{ tabBarIcon: () => (<Ionicons name="document" size={32} style={appStyles.iconButton} />) }} />
                    
                    <Tab.Screen 
                        name="Camera" 
                        component={CameraComponent} 
                        options={{ tabBarIcon: () => (<Ionicons name="camera" size={32} style={appStyles.iconButton} />) }} />
                    
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}