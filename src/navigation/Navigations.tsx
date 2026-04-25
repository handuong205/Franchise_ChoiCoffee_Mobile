import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '@/components/layouts/footer/BottomTabNavigator';
import Header from '@/components/layouts/header/Header.main';
import { Animated } from 'react-native';
import { useRef } from 'react';

export type RootStackParamList = {
  MainTabs: { scrollY: Animated.Value } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigations = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <Stack.Navigator 
      screenOptions={({ route } : any) => ({
        headerTransparent: true,
        // Lấy scrollY từ params của màn hình hiện tại
        header: () => <Header />
      })}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabs}
        initialParams={{ scrollY }}
        />
        
    </Stack.Navigator>
  )
}

export default Navigations