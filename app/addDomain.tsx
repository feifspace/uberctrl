import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useNavigation } from 'expo-router';
import { Switch, Text } from 'react-native-paper';

import Colors from '../constants/Colors';

export default function AddDomainScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    
    const [email, setEmail] = useState(false);
    const toggleSwitch = () => setEmail(previousState => !previousState);
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => {
                    router.push({ pathname: 'console', params: { user: local.user }});
                }}>
                    {({ pressed }) => (
                        <Icon
                            name="console"
                            size={25}
                            color={Colors[colorScheme ?? 'light'].text}
                            style={{ marginRight: Platform.OS === 'android' ? 0 : 15, opacity: pressed ? 0.5 : 1 }}
                        />
                    )}
                </Pressable>
            )
        });
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 30 }}>
                <Text>E-Mails empfangen</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={email}
                    style={{ margin: 0, padding: 0 }}
                />
            </View>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    title: {
        fontWeight: 'bold'
    },
    text: {
        marginBottom: 30
    }
});
