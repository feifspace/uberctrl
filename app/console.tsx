import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { submitCommand } from '../components/Websockets';

export default function ConsoleScreen() {
    const [command, setCommand] = useState('');
    const local = useLocalSearchParams();
    
    let placeholder = '[' + local.user + '@' + local.host + ' ~]$';
    
    return (
        <View style={styles.container}>
            <TextInput
                value={command}
                _mode="outlined"
                multiline={true}
                onChangeText={text => setCommand(text)}
                textColor="white"
                style={{ backgroundColor: 'transparent' }}
                placeholder={placeholder}
                left={() => {
                    <Text>hallo</Text>
                }}
            />
            
            <Button
                style={{ marginTop: 30 }}
                icon="send-outline"
                mode="contained"
                onPress={() => console.log('Pressed')}
            >
                Ausführen
            </Button>
  
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: 'black',
        padding: 15
    },
    text: {
        marginBottom: 30
    }
});
