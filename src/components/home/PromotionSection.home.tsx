import React from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PROMOS = [
  {
    id: '1',
    badge: 'Mới',
    title: 'Giảm 20% cho đơn đầu tiên',
    subTitle: 'Sử dụng mã OBSIDIAN20',
    colors: ['rgba(230, 144, 25, 0.2)', 'transparent'], // Màu primary-container/30
  },
  {
    id: '2',
    badge: '',
    title: 'Mua 1 Tặng 1',
    subTitle: 'Dành cho mọi loại Cold Brew',
    colors: ['rgba(204, 204, 204, 0.3)', 'transparent'], // Màu surface-variant/40
  },
];

const PromotionSection = () => {
  return (
    <View className="py-10 bg-gray-50">
      {/* Header Section */}
      <View className="flex-row justify-between items-end mb-4 px-4">
                  <View>
                      <Text className="text-2xl font-bold text-primary">Promotions</Text>
                     
                  </View>
                  
              </View>

      {/* Horizontal Promo List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        className="flex-row"
      >
        {PROMOS.map((promo) => (
          <View
            key={promo.id}
            style={{
              width: width * 0.75, 
              height: 160,         // h-40
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
            className="relative mr-4 rounded-xl overflow-hidden bg-white border border-gray-100 p-5 flex-col justify-between"
          >
            {/* Gradient Background */}
            <LinearGradient
              colors={promo.colors as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', inset: 0 }}
            />

            {/* Content Top */}
            <View className="relative z-10">
              {promo.badge ? (
                <View className="bg-orange-600 self-start px-2 py-1 rounded">
                  <Text className="text-[10px] font-poppins-bold text-white uppercase tracking-wider">
                    {promo.badge}
                  </Text>
                </View>
              ) : null}
              
              <Text className={`font-poppins-bold text-lg mt-2 ${promo.id === '2' ? 'text-primary' : 'text-gray-800'}`}>
                {promo.title}
              </Text>
              <Text className="font-poppins-regular text-xs text-gray-500 mt-1">
                {promo.subTitle}
              </Text>
            </View>

            {/* Action Bottom */}
            <View className="relative z-10 flex-row justify-end">
              <Pressable className="p-1">
                <Ionicons name="arrow-forward-circle" size={28} color="#e69019" />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PromotionSection;