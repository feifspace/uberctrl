import { Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ManualScreen() {
    return (
        <WebView
      style={styles.container}
      source={{ uri: 'https://manual.uberspace.de' }}
    />
    );
}

const styles = StyleSheet.create({
});
