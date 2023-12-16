import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link, Tabs, useRouter } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>['name'];
  color: string;
}) {
  return <Icon size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    href: null,
                    title: 'UBERCTRL',
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                onPress={() => { router.push('manual') }}
                                style={{ marginRight: 30 }}
                            >
                                {({ pressed }) => (
                                    <Icon
                                        name="book-open-page-variant-outline"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{ opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                            <Pressable
                                onPress={() => { router.push('donate') }}
                                style={{ marginRight: 30 }}
                            >
                                {({ pressed }) => (
                                    <Icon
                                        name="heart-outline"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{ opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                            <Pressable
                                onPress={() => { router.push('privacy') }}
                                style={{ marginRight: Platform.OS === 'android' ? 0 : 15 }}
                            >
                                {({ pressed }) => (
                                    <Icon
                                        name="shield-account-outline"
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                        style={{ opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="space"
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="orbit" color={color} />,
                }}
            />
            <Tabs.Screen
                name="domains"
                options={{
                    title: 'Domains',
                    tabBarIcon: ({ color }) => <TabBarIcon name="web" color={color} />
                }}
            />
            <Tabs.Screen
                name="mails"
                options={{
                    title: 'E-Mails',
                    tabBarIcon: ({ color }) => <TabBarIcon name="at" color={color} />
                }}
            />
        </Tabs>
    );
}
