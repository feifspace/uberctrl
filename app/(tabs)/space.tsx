import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

import Colors from '../../constants/Colors';

export default function SpaceScreen() {
    const navigation = useNavigation();
    const local = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const router = useRouter();
    
    useEffect(() => {
        navigation.setOptions({
            title: local.user ? local.user.toUpperCase() : '',
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => {
                        router.push({ pathname: 'console', params: { user: local.user ? local.user : '', host: local.host ? local.host : '' }});
                    }}>
                        {({ pressed }) => (
                            <Icon
                                name="console"
                                size={25}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={{ marginRight: 30, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                    <Pressable onPress={() => {
                        router.push('(tabs)');
                    }}>
                        {({ pressed }) => (
                            <Icon
                                name="logout"
                                size={25}
                                color={Colors[colorScheme ?? 'light'].text}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </View>
            )
        });
    }, [navigation, local]);
    
    return (
        <View style={styles.container}>
            <Text>klappt</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
