import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import * as Location from 'expo-location';
import { getDB } from '../database/db';

const db = getDB();

export default function VisitScreen({ route, navigation }) {
    const { customerId } = route.params || {};
    const [visiting, setVisiting] = useState(false);
    const [location, setLocation] = useState(null);
    const [visitId, setVisitId] = useState(null);

    const startVisit = async () => {
        setVisiting(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            setVisiting(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Create Visit in DB
        const start_time = new Date().toISOString();
        const result = await db.runAsync(
            `INSERT INTO visits (customer_id, start_time, status, sync_status) VALUES (?, ?, 'In Progress', 0)`,
            [customerId, start_time]
        );

        setVisitId(result.lastInsertRowId); // Use local ID separate from server ID
    };

    const endVisit = async () => {
        if (!visitId) return;

        const end_time = new Date().toISOString();
        await db.runAsync(
            `UPDATE visits SET end_time = ?, status = 'Completed' WHERE rowid = ?`,
            [end_time, visitId]
        );

        setVisiting(false);
        setVisitId(null);
        Alert.alert("Visit Completed", "Data saved locally.");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {!visiting ? (
                <View style={styles.center}>
                    <Text variant="headlineMedium" style={styles.text}>Ready to Check-in</Text>
                    <Button mode="contained" icon="map-marker-check" onPress={startVisit} style={styles.btn}>
                        Check In
                    </Button>
                </View>
            ) : (
                <View style={styles.center}>
                    <Text variant="headlineMedium" style={{ color: 'green' }}>Visit In Progress</Text>
                    <Text>Started at: {new Date().toLocaleTimeString()}</Text>
                    {location && <Text>Loc: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}</Text>}

                    <Button mode="contained" buttonColor="red" icon="stop-circle" onPress={endVisit} style={styles.btn}>
                        Check Out
                    </Button>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { marginBottom: 20 },
    btn: { width: '80%', marginTop: 20, padding: 5 }
});
