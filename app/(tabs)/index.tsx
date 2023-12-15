import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, FAB, Icon, IconButton, Text } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import * as Device from 'expo-device';

export default function TabOneScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    
    const isMobile = Device.deviceType == 1 ? true : false;
    
    const [data, setData] = useState([]);
    
    const DATA = [{
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        user: 'feif',
        host: 'deneb.uberspace.de'
    }, {
        id: 'new',
        user: 'concta',
        host: 'kojima.uberspace.de'
    }];
    
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
        }
    };
    
    const LeftContent = props => <Avatar.Icon {...props}  icon="orbit" />
    
    const Item = ({user, host, image}) => (
        <View style={[styles.item, { width: (isMobile ? '50%' : '25%'), alignItems: 'center' }]}>
            {/*<Avatar.Image size={130} source={image} style={{marginBottom: 15 }} />*/}
            <Card style={styles.card} onPress={() => {
                
                router.push({ pathname: 'space', params: { user: user, host: host } });
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
                    <Text variant="bodySmall">{host}</Text>
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
            
        });
        
        navigation.setOptions({
            tabBarStyle: { display: 'none' }
        });
    }, [navigation]);
    
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={isMobile ? 2 : 4}
                data={DATA}
                _scrollEnabled={false}
                renderItem={({item}) => <Item user={item.user} host={item.host} />}
                keyExtractor={item => item.id}
            />
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
