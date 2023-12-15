import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { Button, Switch, Text, TextInput } from 'react-native-paper';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';

import Colors from '../constants/Colors';

export default function DonateScreen() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [host, setHost] = useState('');
    const [password, setPassword] = useState('');
    const [port, setPort] = useState('');
    const [url, setUrl] = useState('');
    const [autoSetup, setAutoSetup] = useState(false);
    const [optional, setOptional] = useState(false);
    
    const toggleSwitch = () => setOptional(previousState => !previousState);
    
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(password);
    };
    
    const randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    };
    
    const createPassword= () => {
        let temp = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?.,#+-_!$%&()');
        setPassword(temp);
    };
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    {/*<FontAwesome
                        name="save"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 30 }}
                        onPress={() => {
                            ping({ url: url != '' ? url : 'uberctrl.' + uberspace.toLowerCase() + '.uber.space' })
                            .then((res) => {
                                if (res) {
                                    storeJSON({ username: uberspace, hostname: host.replace('.uberspace.de', ''), password: password, url: (url != '' ? url : 'uberctrl.' + uberspace.toLowerCase() + '.uber.space'), port: (port != '' ? port : '65000') })
                                    .then(() => {
                                        getPassword('new')
                                        .then((res) => {
                                            setPassword(res)
                                        });
                                    });
                                }
                            });
                        }}
                    />*/}
                    
                    
                    <Pressable
                        onPress={() => {
                            alert('ok')
                            /*ping({ url: url != '' ? url : 'uberctrl.' + uberspace.toLowerCase() + '.uber.space' })
                            .then((res) => {
                                if (res) {
                                    storeJSON({ username: uberspace, hostname: host.replace('.uberspace.de', ''), password: password, url: (url != '' ? url : 'uberctrl.' + uberspace.toLowerCase() + '.uber.space'), port: (port != '' ? port : '65000') })
                                    .then(() => {
                                        getPassword('new')
                                        .then((res) => {
                                            setPassword(res)
                                        });
                                    });
                                }
                            });*/
                        }}
                        disabled={!autoSetup ? true : false}
                    >
                        {({ pressed }) => (
                            <Icon
                                name="auto-fix"
                                size={25}
                                color={autoSetup ?  Colors[colorScheme ?? 'light'].text : 'lightgrey'}
                                style={{ marginRight: 30, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                    
                    <Pressable
                        onPress={() => {
                            alert('ok')
                            /*ping({ url: url != '' ? url : 'uberctrl.' + uberspace.toLowerCase() + '.uber.space' })
                            .then((res) => {
                                if (res) {
                                    storeJSON({ username: uberspace, hostname: host.replace('.uberspace.de', ''), password: password, url: (url != '' ? url : 'uberctrl.' + uberspace.toLowerCase() + '.uber.space'), port: (port != '' ? port : '65000') })
                                    .then(() => {
                                        getPassword('new')
                                        .then((res) => {
                                            setPassword(res)
                                        });
                                    });
                                }
                            });*/
                        }}
                        disabled={user != '' && host != '' && password != '' ? false : true}
                    >
                        {({ pressed }) => (
                            <Icon
                                name="content-save-outline"
                                size={25}
                                color={user != '' && host != '' && password != '' ?  Colors[colorScheme ?? 'light'].text : 'lightgrey'}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </View>
            )
        });
    }, [navigation, user, host, password, url, port]);
    
    return (
        <ScrollView style={styles.container}>
            <TextInput
                value={user}
                label="Username"
                onChangeText={text => setUser(text)}
                style={styles.input}
            />
            <TextInput
                value={host}
                label="Hostname"
                onChangeText={text => setHost(text)}
                style={styles.input}
            />
            
            <Text style={styles.text}>Kopiere und speichere das Passwort in Deinem uberspace unter SSH-Zugang, oder gib das bereits vorhandene Passwort ein.</Text>
            
            <TextInput
                value={password}
                label="Passwort"
                onChangeText={text => setPassword(text)}
                style={styles.input}
                right={<TextInput.Icon icon="content-copy" onPress={() => copyToClipboard(password)} />}
            />
            <Button
                mode="text"
                onPress={() => createPassword()}
                //color="#841584"
                //accessibilityLabel="Learn more about this purple button"
            >
                Passwort generieren
            </Button>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: 30 }}>
                <Text>Erweiterte Einstellungen</Text>
                <Switch
                    _trackColor={{false: '#767577', true: '#81b0ff'}}
                    _thumbColor={optional ? '#f5dd4b' : '#f4f3f4'}
                    _ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={optional}
                    style={{ margin: 0, padding: 0 }}
                />
            </View>
            
            {optional && <>
                <Text style={styles.text}>Die angezeigten Standardeinstellungen können entsprechend der eigenen Konfiguration geändert werden. Natürlich nur, wenn Du weißt was Du tust. 😉</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUrl}
                    value={url}
                    placeholder={'URL: uberctrl.' + (user != '' ? user.toLowerCase() : 'username') + '.uber.space'}
                />
                <TextInput
                    style={[styles.input, { marginBottom: 50 }]}
                    onChangeText={setPort}
                    value={port}
                    placeholder="Port: 65000"
                    inputMode="numeric"
                />
            </>}
            
            {/*<Button
                mode="contained"
                onPress={() => Linking.openURL('https://paypal.me/feifspace')}
                //color="#841584"
                //accessibilityLabel="Learn more about this purple button"
            >
                Mit Paypal fortfahren
            </Button>*/}
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'white',
        padding: 15
    },
    input: {
        marginBottom: 30,
        backgroundColor: 'transparent'
    },
    text: {
        marginBottom: 30
    }
});
