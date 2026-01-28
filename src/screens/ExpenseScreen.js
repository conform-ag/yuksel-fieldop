import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { getDB } from '../database/db';

const db = getDB();

export default function ExpenseScreen({ navigation }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('Personal Funds');
    const [loading, setLoading] = useState(false);

    const saveExpense = async () => {
        setLoading(true);
        try {
            await db.runAsync(
                `INSERT INTO expense_logs (amount, type, payment_source, description, date, sync_status) VALUES (?, 'Travel', ?, ?, ?, 0)`,
                [parseFloat(amount), source, description, new Date().toISOString()]
            );
            navigation.goBack();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
            />

            <SegmentedButtons
                value={source}
                onValueChange={setSource}
                buttons={[
                    { value: 'Personal Funds', label: 'Personal' },
                    { value: 'Company Card/Advance', label: 'Company Card' },
                ]}
                style={styles.input}
            />

            <Button mode="contained" onPress={saveExpense} loading={loading} style={styles.btn}>
                Log Expense
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { marginBottom: 20 },
    btn: { padding: 5 }
});
