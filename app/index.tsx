import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { UserProvider } from './UserContext'; 
import TabsScreen from './TabsScreen'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from './EventScreen';
import CreateEvents from './CreateEvents';



const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <UserProvider>
        <TabsScreen />
    </UserProvider>
   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Optional background color
  },
});
