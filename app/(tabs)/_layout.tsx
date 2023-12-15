import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
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
                            <Link href="/manual" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <Icon
                                            name="book-open-page-variant-outline"
                                            size={25}
                                            color={Colors[colorScheme ?? 'light'].text}
                                            style={{ marginRight: 30, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                            <Link href="/donate" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <Icon
                                            name="heart-outline"
                                            size={25}
                                            color={Colors[colorScheme ?? 'light'].text}
                                            style={{ marginRight: 30, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                            <Link href="/privacy" asChild>
                                <Pressable>
                                    {({ pressed }) => (
                                        <Icon
                                            name="shield-account-outline"
                                            size={25}
                                            color={Colors[colorScheme ?? 'light'].text}
                                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
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
