import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraComponent from './app/components/CameraComponent/CameraComponent';
import ReceiptComponent from './app/components/ReceiptsComponent/ReceiptsComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import appStyles from './app/styles';

const Tab = createBottomTabNavigator();

const screenOptions = {

};

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Camera" component={CameraComponent} options={{ tabBarIcon: () => (<Ionicons name="camera" size={32} style={appStyles.iconButton} />) }} />
            <Tab.Screen name="Recibos" component={ReceiptComponent} options={{ tabBarIcon: () => (<Ionicons name="document" size={32} style={appStyles.iconButton} />) }} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
