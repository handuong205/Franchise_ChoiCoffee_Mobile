import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '@/assets/logo/Logo.png';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import { LoginService } from './service/login.service';
import { authService } from './service/aut.service';
import { useCustomerAuthStore } from '@/store/useCustomerAuthStore';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setCustomer = useCustomerAuthStore((s) => s.setCustomer);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }
    // console.log({ email, password });

    try {
      const response = await LoginService(email.trim(), password.trim());
      if (response) {
        const res = await authService();

        if (res) {
          setCustomer(res.data);
        }
      }
      // console.log('Login successful:');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="absolute inset-0">
          {/* Gradient dọc: cam -> trắng */}
          <LinearGradient
            colors={[
              'rgba(230,144,25,0.42)', // trên đậm
              'rgba(230,144,25,0.22)',
              'rgba(230,144,25,0.08)',
              'rgba(255,255,255,0.92)', // gần trắng
              'rgba(255,255,255,1)', // trắng hoàn toàn
            ]}
            locations={[0, 0.35, 0.6, 0.82, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* Gradient chéo glow */}
          <LinearGradient
            colors={['rgba(230,144,25,0.25)', 'rgba(230,144,25,0.1)', 'transparent']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </View>
        <View
          className="flex-1 "
          style={{
            paddingHorizontal: 20,
          }}>
          <View
            // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1">
            <View className="flex-1">
              {/* Logo Section */}
              <View className="items-center justify-center py-20">
                <View className="flex-row items-center">
                  <Image source={logo} className="h-20 w-20 rounded-full" />
                  <View className="pl-2">
                    <Text className="font-poppins-bold text-3xl  text-primary">ChoiCoffee</Text>
                    <Text className="font-poppins-regular text-xl text-gray-500">
                      HERITAGE COFFE
                    </Text>
                  </View>
                </View>
              </View>

              {/* Form */}
              <View className="flex-1 pb-24">
                <View
                  className="shadow-xm flex-1 rounded-3xl bg-white py-5"
                  style={{ elevation: 5 }}>
                  {/* Email Field */}
                  <View className="mb-2 items-center justify-center py-10">
                    <Text className="text-3xl font-extrabold text-charcoal">Đăng nhập</Text>
                  </View>
                  <View className="flex-1 px-3">
                    <View className="">
                      <View className="flex-row items-center pb-2">
                        <Text className="ml-1 text-sm font-black uppercase tracking-[2px] text-charcoal">
                          Email
                        </Text>
                        <View className="pb-2">
                          <FontAwesome6 name="asterisk" size={6} color="red" />
                        </View>
                      </View>

                      <View className="relative flex-row items-center rounded-2xl border border-neutral-200  px-4">
                        <Ionicons name="mail-open" color="#A3A3A3" size={20} />
                        <TextInput
                          className="flex-1 px-3 py-4 font-semibold text-neutral-800"
                          placeholder="partner@example.com"
                          value={email}
                          onChangeText={setEmail}
                          placeholderTextColor="#A3A3A3"
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </View>
                    </View>

                    {/* Password Field */}
                    <View className="pt-6">
                      <View className="flex-row items-center justify-between px-1">
                        <View className="flex-row items-center pb-2">
                          <Text className="ml-1 text-sm font-black uppercase tracking-[2px] text-charcoal">
                            Mật khẩu
                          </Text>
                          <View className="pb-2">
                            <FontAwesome6 name="asterisk" size={6} color="red" />
                          </View>
                        </View>
                      </View>
                      <View className="relative flex-row items-center rounded-2xl border border-neutral-200 px-4">
                        <Ionicons name="lock-closed" color="#A3A3A3" size={20} />
                        <TextInput
                          className="flex-1 px-3 py-4 font-semibold text-neutral-800"
                          placeholder="••••••••"
                          placeholderTextColor="#A3A3A3"
                          secureTextEntry={!passwordVisible}
                          value={password}
                          onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                          {passwordVisible ? (
                            <Ionicons name="eye-off" color="#A3A3A3" size={20} />
                          ) : (
                            <Ionicons name="eye" color="#A3A3A3" size={20} />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View className="mt-6 flex-row items-center justify-end px-1 ">
                        <TouchableOpacity>
                          <Text className="text-sm font-bold text-[#D4A373]">Quên mật khẩu?</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="py-14">
                      <TouchableOpacity
                        activeOpacity={0.9}
                        className="mt-4 w-full flex-row items-center justify-center space-x-2 rounded-2xl bg-primary py-4 "
                        onPress={handleLogin}>
                        <Text className="text-lg font-bold text-white">Đăng nhập </Text>
                        <View className="">
                          <Ionicons name="arrow-forward" color="white" size={20} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Login Button */}
                </View>
              </View>

              {/* Footer */}
              <View className="mt-auto flex-row items-center justify-center pb-6">
                <Text className="font-medium text-neutral-500">Bạn chưa có tài khoản?</Text>
                <TouchableOpacity>
                  <Text className="ml-1 font-bold text-primary"> Đăng ký ngay</Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Branding */}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
