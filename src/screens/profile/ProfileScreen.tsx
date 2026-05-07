import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { logoutService } from "./service/logout.service";
import { useCustomerAuthStore } from "@/store/useCustomerAuthStore";


const ProfileScreen = () => {    
    const { setCustomer } = useCustomerAuthStore();

    const handleLogout = async () => {
        try{
            await logoutService();
            await AsyncStorage.removeItem('customer');
            setCustomer(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
        <View className="border py-2 px-2 border-red-500 rounded-lg bg-red-500">
            <Button title="Đăng xuất" color="white" onPress={handleLogout} 
            />
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen