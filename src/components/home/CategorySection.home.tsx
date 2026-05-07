import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { Categories } from './model/categoryResponse';
import { useFranchiseStore } from '@/store/useFranchiseStore';
import { getCategoriesByFranchise } from './service/category.client.service';

const CategorySection = () => {
  const [categories, setCategories] = useState<Categories[] >([]);
  const franchise = useFranchiseStore();
  // console.log(franchise.selectedFranchise?.id);
  const fetchCategories = async (franchiseId: string) => {
    try {
      const res = await getCategoriesByFranchise(franchiseId);
      if (res) {
        setCategories(res);
      }
    } catch (error) {
      console.error('Error fetching categories in component:', error);
    }
  };

  useEffect (() => {
    if (franchise.selectedFranchise) {
      fetchCategories(franchise.selectedFranchise?.id);
    }
  }, [franchise.selectedFranchise]);

  return (
    <View className="py-6">
      {/* Header */}
      <View className="mb-4 flex-row items-end justify-between px-4">
        <View>
          <Text className="text-2xl font-bold text-primary">Danh mục sản phẩm</Text>
          
        </View>
        <Text className="text-sm text-primary">Tất cả →</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        className="flex-row">
        {categories.slice(0, 6).map((item) => (
          <Pressable
            key={item.category_id}
            className="mr-6 items-center"
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
              className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-white">
              {/* <Ionicons name={item.icon as any} size={26} color="#e69019" /> */}
              <Text className="font-poppins-bold text-lg text-primary">
                {item.category_code.slice(0, 1)}
              </Text>
            </View>

            {/* Nhãn     văn bản */}
            <Text className="font-poppins-regular text-[10px] tracking-wide text-clay">
              {item.category_name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySection;