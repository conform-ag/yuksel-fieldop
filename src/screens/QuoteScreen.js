import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-paper';
import client from '../api/client';

// Simple Cart Context or State passed via params
// For this demo, we assume items are passed or we pick from catalog.
// Let's implement a simple "Add items" flow or just hardcode for demo.

export default function QuoteScreen({ route, navigation }) {
    const { customerId } = route.params || {};
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const addItem = () => {
        // Ideally opens Catalog to select
        // Mocking an item add
        const newItem = {
            id: items.length + 1,
            item_code: "SEED-TOM-001",
            name: "Tomato Tyral F1",
            qty: 1
        };
        setItems([...items, newItem]);
    };

    const submitQuote = async () => {
        if (items.length === 0) return;
        setLoading(true);
        try {
            const payload = items.map(i => ({ item_code: i.item_code, qty: i.qty }));
            const res = await client.post('/api/method/yuksel_app.api.mobile.smart_quote', {
                customer: customerId || "CUST-001", // Fallback for dev
                items: JSON.stringify(payload)
            });

            const { id, total, currency } = res.data.message;
            Alert.alert("Quote Created", `ID: ${id}\nTotal: ${currency} ${total}`);
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button mode="outlined" icon="plus" onPress={addItem} style={styles.btn}>
                Add Mock Item
            </Button>

            <FlatList
                data={items}
                keyExtractor={i => i.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={item.name} subtitle={`Qty: ${item.qty}`} />
                    </Card>
                )}
            />

            <Divider />
            <View style={styles.footer}>
                <Button mode="contained" onPress={submitQuote} loading={loading} disabled={items.length === 0} style={styles.btn}>
                    Submit Quote
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    card: { marginBottom: 10 },
    btn: { marginBottom: 10 },
    footer: { marginTop: 20 }
});
