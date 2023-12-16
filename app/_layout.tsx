import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { connectHelper } from '../components/Websockets';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const router = useRouter();
    
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...Icon.font,
    });
    
    useEffect(() => {
        if (error) throw error;
    }, [error]);
        
    useEffect(() => {
        connectHelper()
        .then((res) => {
            SplashScreen.hideAsync();
        })
        .catch(err => {
            SplashScreen.hideAsync();
            setTimeout(() => {
                router.replace('update');
            }, 1000);
        });
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="addSpace" options={{ title: 'Verbinden' }} />
        <Stack.Screen name="console" options={{ title: 'Console' }} />
        <Stack.Screen name="donate" options={{ title: 'Like it?' }} />
        <Stack.Screen name="manual" options={{ headerShown: false }} />
        <Stack.Screen name="privacy" options={{ title: 'Hinweise' }} />
        <Stack.Screen name="update" options={{ headerShown: false }} />
      </Stack>
        </PaperProvider>
    </ThemeProvider>
  );
}
