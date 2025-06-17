import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  // State for sending
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sendResult, setSendResult] = useState('');

  // State for retrieving
  const [retrieveRecipient, setRetrieveRecipient] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [retrieveResult, setRetrieveResult] = useState('');

  // Adjust this to match your backend
  const API_BASE = 'http://localhost:3001';

  // Send Message
  const sendMessage = async () => {
    setSendResult('Sending...');
    try {
      const response = await fetch(`${API_BASE}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, recipient, message }),
      });
      const data = await response.json();
      setSendResult(data.success ? 'Message sent!' : data.error || 'Failed to send');
    } catch (err) {
      setSendResult('Error sending message');
    }
  };

  // Retrieve Messages
  const retrieveMessages = async () => {
    setRetrieveResult('Retrieving...');
    try {
      const response = await fetch(
        `${API_BASE}/retrieveMessages?recipient=${encodeURIComponent(retrieveRecipient)}`
      );
      const data = await response.json();
      setMessages(data.messages || []);
      setRetrieveResult(`Found ${data.messages?.length || 0} message(s).`);
    } catch (err) {
      setRetrieveResult('Error retrieving messages');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Messenger App</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Send Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Sender"
          value={sender}
          onChangeText={setSender}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={recipient}
          onChangeText={setRecipient}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
        {sendResult ? <Text>{sendResult}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Retrieve Messages</Text>
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={retrieveRecipient}
          onChangeText={setRetrieveRecipient}
        />
        <Button title="Retrieve" onPress={retrieveMessages} />
        {retrieveResult ? <Text>{retrieveResult}</Text> : null}
        {messages.map((msg, i) => (
          <View key={i} style={styles.messageBox}>
            <Text>
              <Text style={styles.bold}>From:</Text> {msg.sender}
            </Text>
            <Text>
              <Text style={styles.bold}>Message:</Text> {msg.message}
            </Text>
            <Text style={styles.timestamp}>{msg.timestamp}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  card: { padding: 16, marginVertical: 12, backgroundColor: '#eee', borderRadius: 8 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 4 },
  messageBox: { backgroundColor: '#fff', padding: 8, borderRadius: 4, marginTop: 8 },
  bold: { fontWeight: 'bold' },
  timestamp: { fontSize: 12, color: '#888' },
});

