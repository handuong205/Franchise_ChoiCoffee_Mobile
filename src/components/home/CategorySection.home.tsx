import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const CATEGORIES = [
  { id: '1', name: 'Dụng Cụ', icon: 'speedometer-outline' }, 
  { id: '2', name: 'Hạt Cà Phê', icon: 'leaf-outline' },    
  { id: '3', name: 'Cold Brew', icon: 'water-outline' },    
  { id: '4', name: 'Bánh Ngọt', icon: 'fast-food-outline' }, 
  { id: '5', name: 'Đặc Sản', icon: 'cafe-outline' },     
];

const CategorySection = () => {
  return (
    <View className="py-6">
         {/* Header */}
        <View className="flex-row justify-between items-end mb-4 px-4">
            <View>
                <Text className="text-2xl font-bold text-primary">Explore by Category</Text>
                <Text className="text-sm text-clay mt-1">Find your perfect match</Text>
            </View>
            <Text className="text-sm text-primary">Tất cả →</Text>
        </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="flex-row"
      >
        {CATEGORIES.map((item) => (
          <Pressable 
            key={item.id} 
            className="items-center mr-6"
            // Thêm logic onPress ở đây nếu cần
          >
            {/* Vòng tròn icon */}
            <View 
              style={{
                shadowColor: '#e5e2e1',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 3, // Cho Android
              }}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2 border border-gray-100"
            >
              <Ionicons name={item.icon as any} size={26} color="#e69019" />
            </View>

            {/* Nhãn     văn bản */}
            <Text className="font-poppins-regular text-[10px] text-gray-700 tracking-wide">
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySection;