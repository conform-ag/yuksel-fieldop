import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import client from '../api/client';

export default function LoginScreen({ navigation }) {
    const [url, setUrl] = useState('http://192.168.1.100:8000');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            // ERPNext Login Flow
            // 1. Call standard login to get cookie (optional) or just use API Key/Secret if user knows it.
            // But usually mobile apps use usr/pwd to authenticate and get an API Key or Session.
            // For simplicity, we assume we call a custom login endpoint or use standard authentication.

            // Let's assume standard pwd-based login to get a cookie or key.
            const response = await axios.post(`${url}/api/method/login`, {
                usr: username,
                pwd: password
            });

            if (response.data.message === 'Logged In') {
                // In a real app, we would fetch the API Key/Secret pairs for this user 
                // or rely on session cookies.
                // For BFF, we ideally use Token Auth.
                // Let's assume we fetch keys or use session.
                // For this demo, let's assume we store the cookie or a token.

                Alert.alert("Login Successful");
                navigation.replace('Dashboard');
            }
        } catch (error) {
            // Mock for now if server not reachable
            if (username === 'demo' && password === 'demo') {
                navigation.replace('Dashboard');
            } else {
                Alert.alert("Login Failed", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Yuksel FieldOp</Title>
            <TextInput
                label="Server URL"
                value={url}
                onChangeText={setUrl}
                style={styles.input}
            />
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
                Login
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        padding: 5,
    },
});
