import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, FAB, Icon, IconButton, Menu, Text } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    
    const isMobile = Device.deviceType == 1 ? true : false;
    
    const [data, setData] = useState([]);
    
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    
    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
        }
    };
    
    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            console.log(e)
        }
    };
    
    const LeftContent = props => <Avatar.Icon {...props}  icon="orbit" />
    
    const Item = ({user, host}) => (
        <View style={[styles.item, { width: (isMobile ? '50%' : '25%'), alignItems: 'center' }]}>
            {/*<Avatar.Image size={130} source={image} style={{marginBottom: 15 }} />*/}
            <Card style={styles.card} onPress={() => {
                
                router.push({ pathname: 'space', params: { user: user } });
            }}>
                {/*<Card.Title title={title} subtitle={host} left={LeftContent} />*/}
                <Card.Content>
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Icon
                            source="orbit"
                            size={40}
                        />
                    </View>
                    <Text variant="titleMedium">{user}</Text>
                    <Text variant="bodySmall">{host}.uberspace.de</Text>
                </Card.Content>
                {/*<Card.Actions>
                    <IconButton icon="trash-can-outline" />
                    <Button icon="orbit">Verbinden</Button>
                </Card.Actions>*/}
            </Card>
        </View>
    );
    
    useEffect(() => {
        getData('spaces')
        .then((res) => {
            setData(res);
        });
        
        navigation.setOptions({
            tabBarStyle: { display: 'none' }
        });
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={isMobile ? 2 : 4}
                data={data}
                _scrollEnabled={false}
                renderItem={({item}) => <Item user={item.username} host={item.hostname} />}
                keyExtractor={item => item.id}
            />
            <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
            <FAB
                icon="plus"
                _label="Anlegen"
                style={styles.fab}
                onPress={() => router.push('addSpace')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: 'white'
    },
    fab: {
        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 0,
    },
    item: {
        padding: 15
    },
    card: {
        width: '100%',
        backgroundColor: 'white'
    }
});
