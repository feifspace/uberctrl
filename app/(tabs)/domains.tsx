import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';

export default function DomainsScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    
    useEffect(() => {
        
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <Text>domains</Text>
            <FAB
                icon="plus"
                _label="Anlegen"
                style={styles.fab}
                onPress={() => router.push('addDomain')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
    }
});
