import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, Card, Divider } from 'react-native-paper';
import { getDB } from '../database/db';

const db = getDB();

export default function CatalogScreen() {
    const [varieties, setVarieties] = useState([]);

    useEffect(() => {
        loadCatalog();
    }, []);

    const loadCatalog = async () => {
        const rows = await db.getAllAsync('SELECT * FROM varieties');
        setVarieties(rows);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={varieties}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={item.name} subtitle={`${item.crop} - ${item.code}`} />
                        <Card.Content>
                            <View style={styles.row}>
                                <Text variant="bodyMedium">Stock: {item.stock_qty} (Pack 1000)</Text>
                                <Text variant="titleMedium">${item.price}</Text>
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    card: { marginBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }
});
