import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraComponent from './app/components/CameraComponent/CameraComponent';
import ReceiptComponent from './app/components/ReceiptsComponent/ReceiptsComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import appStyles from './app/styles';

const Tab = createBottomTabNavigator();

const screenOptions = {

};

export default function App() {
    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermissions = await MediaLibrary.getPermissionsAsync();
            if (!mediaLibraryPermissions.granted) {
                const novaPermissao = await MediaLibrary.requestPermissionsAsync();
            }
        })();
    }, []);
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Recibos" component={ReceiptComponent} options={{ tabBarIcon: () => (<Ionicons name="document" size={32} style={appStyles.iconButton} />) }} />
                <Tab.Screen name="Camera" component={CameraComponent} options={{ tabBarIcon: () => (<Ionicons name="camera" size={32} style={appStyles.iconButton} />) }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}