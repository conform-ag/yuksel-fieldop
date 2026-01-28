import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { initDatabase } from './src/database/db';

// Placeholder Screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CustomerMapScreen from './src/screens/CustomerMapScreen';
import VisitScreen from './src/screens/VisitScreen';
import CatalogScreen from './src/screens/CatalogScreen';
import ExpenseScreen from './src/screens/ExpenseScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or Splash Screen
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="CustomerMap" component={CustomerMapScreen} options={{ title: 'Customers' }} />
          <Stack.Screen name="Visit" component={VisitScreen} options={{ title: 'Active Visit' }} />
          <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Seed Catalog' }} />
          <Stack.Screen name="Expenses" component={ExpenseScreen} options={{ title: 'My Expenses' }} />
          <Stack.Screen name="Quote" component={QuoteScreen} options={{ title: 'New Quote' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
