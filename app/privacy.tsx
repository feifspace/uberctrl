import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function PrivacyScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                So funktioniert's
            </Text>
            <Text style={styles.text}>
                UBERCTRL unterstützt Dich mit Deinem uberspace.
            </Text>
            <Text style={styles.text}>
                Alle Konfigurationen unter: manual.uberspace.de
            </Text>
            <Text style={styles.text}>
                Sicherheit geht vor. Deine Daten bleiben ausschließlich auf dem Gerät gespeichert.
            </Text>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: 'white',
        padding: 15
    },
    title: {
        fontWeight: 'bold'
    },
    text: {
        marginBottom: 30
    }
});
