import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Text, Button, useTheme } from 'react-native-paper';

export default function DashboardScreen({ navigation }) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Dashboard" />
                <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.content}>

                {/* KPI Section */}
                <View style={styles.kpiContainer}>
                    <Card style={[styles.kpiCard, { backgroundColor: theme.colors.primaryContainer }]}>
                        <Card.Content>
                            <Text variant="titleMedium">Sales</Text>
                            <Text variant="headlineMedium">$12.5k</Text>
                        </Card.Content>
                    </Card>

                    <Card style={[styles.kpiCard, { backgroundColor: theme.colors.secondaryContainer }]}>
                        <Card.Content>
                            <Text variant="titleMedium">Visits</Text>
                            <Text variant="headlineMedium">4/8</Text>
                        </Card.Content>
                    </Card>
                </View>

                {/* Quick Actions */}
                <Title style={styles.sectionTitle}>Quick Actions</Title>

                <View style={styles.actionGrid}>
                    <Button icon="map-marker" mode="outlined" onPress={() => navigation.navigate('CustomerMap')} style={styles.actionBtn}>
                        Customers
                    </Button>
                    <Button icon="briefcase-plus" mode="outlined" onPress={() => navigation.navigate('Visit')} style={styles.actionBtn}>
                        New Visit
                    </Button>
                    <Button icon="seed" mode="outlined" onPress={() => navigation.navigate('Catalog')} style={styles.actionBtn}>
                        Catalog
                    </Button>
                    <Button icon="receipt" mode="outlined" onPress={() => navigation.navigate('Expenses')} style={styles.actionBtn}>
                        Expenses
                    </Button>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 15,
    },
    kpiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    kpiCard: {
        width: '48%',
    },
    sectionTitle: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionBtn: {
        width: '48%',
        marginBottom: 15,
    }
});
