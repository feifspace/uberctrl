import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as Linking from 'expo-linking';

export default function DonateScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>UBERCTRL steht in keinerlei Zusammenhang mit uberspace.de und wird unabhängig entwickelt.</Text>
          
            <Text style={styles.text}>Wer das Projekt dennoch unterstützen möchte, kann dies unter dem folgendem Link tun.</Text>
            
            <Text style={styles.text}>DANKE!</Text>
            
            <Button
                mode="contained"
                onPress={() => Linking.openURL('https://paypal.me/feifspace')}
                //color="#841584"
                //accessibilityLabel="Learn more about this purple button"
            >
                Mit Paypal fortfahren
            </Button>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
        padding: 15
    },
    text: {
        marginBottom: 30
    }
});
