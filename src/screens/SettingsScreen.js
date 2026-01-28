import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, Switch, Button, Divider, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { syncDown, syncUp } from '../api/sync';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen({ navigation }) {
    const { logout, user } = useAuth();
    const [offlineMode, setOfflineMode] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [lastSync, setLastSync] = useState(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const last = await SecureStore.getItemAsync('last_sync');
        if (last) setLastSync(new Date(last).toLocaleString());
    };

    const handleSync = async () => {
        setSyncing(true);
        // 1. Upload Pending
        await syncUp();
        // 2. Download Latest
        const res = await syncDown();

        if (res.success) {
            const now = new Date().toISOString();
            await SecureStore.setItemAsync('last_sync', now);
            setLastSync(new Date(now).toLocaleString());
            Alert.alert("Sync Complete");
        } else {
            Alert.alert("Sync Failed", res.error);
        }
        setSyncing(false);
    };

    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>Account</List.Subheader>
                <List.Item
                    title="User"
                    description={user?.name || "Guest"}
                    left={props => <List.Icon {...props} icon="account" />}
                />
                <Divider />

                <List.Subheader>Data & Sync</List.Subheader>
                <List.Item
                    title="Force Sync"
                    description={lastSync ? `Last: ${lastSync}` : "Never synced"}
                    left={props => <List.Icon {...props} icon="sync" />}
                    right={props => <Button mode="text" onPress={handleSync} loading={syncing} disabled={syncing}>Sync</Button>}
                />

                <List.Item
                    title="Offline Mode"
                    description="Force app to use local DB only"
                    left={props => <List.Icon {...props} icon="wifi-off" />}
                    right={props => <Switch value={offlineMode} onValueChange={setOfflineMode} />}
                />
            </List.Section>

            <View style={styles.footer}>
                <Button mode="outlined" icon="logout" onPress={logout} style={styles.logoutBtn} textColor="red">
                    Logout
                </Button>
                <Text style={styles.version}>Version 1.0.0 (Expo)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    footer: { padding: 20, marginTop: 'auto' },
    logoutBtn: { borderColor: 'red' },
    version: { textAlign: 'center', marginTop: 10, color: 'grey', fontSize: 12 }
});
