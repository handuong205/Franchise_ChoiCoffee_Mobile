import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/home/HomeScreen';
import ProductScreen from '@/screens/product/ProductScreen';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import ProfileScreen from '@/screens/profile/ProfileScreen';

export type BottomTabParamList = {
  home: { scrollY: Animated.Value } | undefined;
  product: { scrollY: Animated.Value } | undefined;
  profile:  undefined;
};



const Tab = createBottomTabNavigator<BottomTabParamList>();



const BottomTabs = ({route} : any) => {
  const scrollY = route.params?.scrollY;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#e69019',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          paddingBottom: 10,
          height: 70,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          if (route.name === 'home') iconName = 'home-sharp';
          if (route.name === 'product') iconName = 'cafe-sharp';
          if (route.name === 'profile') iconName = 'person-sharp';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ' }} 
        initialParams={{ scrollY }}
      />
      <Tab.Screen name="product" component={ProductScreen} options={{ title: 'Sản phẩm' }} />
      <Tab.Screen name="profile" component={ProfileScreen} options={{ title: 'Hồ sơ' }}  />
    </Tab.Navigator>
  );
};

export default BottomTabs;