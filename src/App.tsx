import { StatusBar } from 'expo-status-bar';

import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { FONTS } from './theme/fonts/font';
import regular from './assets/fonts/ios/Poppins Regular 400.ttf';
import medium from './assets/fonts/ios/Poppins Medium 500.ttf';
import bold from './assets/fonts/ios/Poppins Bold 700.ttf';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import Navigations from './navigation/Navigations';
import { TabProvider } from './context/TabContext';
export default function App() {
  const [fontLoad, error] = useFonts({
    [FONTS.REGULAR]: regular,
    [FONTS.MEDIUM]: medium,
    [FONTS.BOLD]: bold,
  })

  useEffect(() => {
    if(fontLoad || error) {
       SplashScreen.hideAsync();
    }
  }, [fontLoad, error]);

  if(!fontLoad && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <TabProvider>
          <SafeAreaProvider>
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </SafeAreaProvider>
        </TabProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
