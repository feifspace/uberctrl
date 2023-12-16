import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../../constants/Colors';

export default function SpaceScreen() {
    const navigation = useNavigation();
    const local = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const router = useRouter();
    
    const [space, setSpace] = useState([]);
    
    const loadSpace = async (value) => {
        try {
            let spaces = JSON.parse(await AsyncStorage.getItem('spaces'));
            
            const i = spaces.findIndex(e => e.username === value);
            if (i > -1) {
                /* vendors contains the element we're looking for, at index "i" */
                return spaces[i];
            }
        } catch (e) {
            // saving error
        }
    };
    
    useEffect(() => {
        loadSpace(local.user)
        .then((res) => {
            console.log(res)
            setSpace(res);
        });
        
        navigation.setOptions({
            title: local.user.toUpperCase(),
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => {
                        router.push({ pathname: 'console', params: { user: local.user }});
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
            <Text>Username: {space.username}</Text>
            <Text>Hostname: {space.hostname}.uberspace.de</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15
    }
});
