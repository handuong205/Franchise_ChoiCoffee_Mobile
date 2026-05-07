import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '@/components/layouts/footer/BottomTabNavigator';
import Header from '@/components/layouts/header/Header.main';
import { ActivityIndicator, Animated, View } from 'react-native';
import { useRef } from 'react';
import { useCustomerAuthStore } from '@/store/useCustomerAuthStore';
import LoginScreen from '@/screens/auth/LoginScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: { scrollY: Animated.Value } | undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigations = () => {
  const { customer, isInitialized } = useCustomerAuthStore();
  const scrollY = useRef(new Animated.Value(0)).current;
  if (!isInitialized) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#D4A373" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={({ route } : any) => ({
        headerTransparent: true,
        // Lấy scrollY từ params của màn hình hiện tại
        header: () => <Header />
      })}
    >
      {customer ? (
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabs}
          initialParams={{ scrollY }}
           options={({ route }) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? 'home';

            return {
              headerTransparent: true,

              // Ẩn header ở profile
              header:
                routeName === 'profile'
                  ? () => null
                  : () => <Header />,
            };
          }}
        />
      ) : (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
      )}
        
    </Stack.Navigator>
  )
}

export default Navigations