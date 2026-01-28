import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Searchbar, FAB, Text, Card, Avatar } from 'react-native-paper';
import { getDB } from '../database/db';

const db = getDB();

export default function CustomerMapScreen({ navigation }) {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        const rows = await db.getAllAsync('SELECT * FROM customers');
        setCustomers(rows);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active/Confirmed': return 'green';
            case 'Opportunity': return 'orange';
            case 'Banned': return 'red';
            default: return 'grey';
        }
    };

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search Customers"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.search}
            />
            <FlatList
                data={customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate('Visit', { customerId: item.id })}>
                        <Card.Title
                            title={item.name}
                            subtitle={item.status}
                            left={(props) => <Avatar.Icon {...props} icon="account" style={{ backgroundColor: getStatusColor(item.status) }} />}
                        />
                    </Card>
                )}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                label="New Prospect"
                onPress={() => console.log('Add Prospect')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    search: { marginBottom: 10 },
    card: { marginBottom: 10 },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
