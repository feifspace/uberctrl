import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from 'expo-router';

export default function EmailsScreen() {
    const navigation = useNavigation();
    
    useEffect(() => {
        
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <Text>mails</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
