import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFranchiseStore } from '@/store/useFranchiseStore';
import { Promotion } from '../home/model/promotionResponse';
import { getPromotionByFranchiseId } from '../home/service/promotion.client.service';
import { COLOR } from '@/theme/colors/color';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width * 0.85; // Banner rộng hơn một chút
const GAP = 16;

const PromotionSection = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [filterPromotions, setFilterPromotions] = useState<Promotion[]>([]);
  const franchiseId = useFranchiseStore((s) => s.selectedFranchise?.id);

  const fetchPromotions = async () => {
    try {
      if (!franchiseId) return;
      const res = await getPromotionByFranchiseId(franchiseId || '');
      if (res) setPromotions(res.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [franchiseId]);

  useEffect(() => {
    if (promotions.length > 0) {
      const activePromos = promotions.filter(
        (promo) => promo.is_active === true && promo.is_deleted === false
      );
      setFilterPromotions(activePromos);
    }
  }, [promotions]);

  if (filterPromotions.length === 0) return null;

  return (
    <View className="bg-white py-1 pb-6">
      {/* Header Section */}
      <View className="mb-5 flex-row items-center justify-between px-5">
        <View className="flex-row items-center">
          <Text className="text-xl font-poppins-bold uppercase tracking-tight text-primary">
            Ưu đãi đặc quyền
          </Text>
        </View>
        {/* <Pressable className="flex-row items-center">
          <Text className="mr-1 text-xs font-bold text-gray-400">Xem thêm</Text>
          <Ionicons name="arrow-forward" size={14} color="#9ca3af" />
        </Pressable> */}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={BANNER_WIDTH + GAP}
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: 20 }}>
        {filterPromotions.map((promo) => {
          const isPercent = promo.type === 'PERCENT';
    
          return (
            <Pressable
              key={promo._id}
              style={{
                width: BANNER_WIDTH,
                height: 160,
                shadowColor: COLOR.CHARCOAL,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.15,
                shadowRadius: 15,
                elevation: 8,
              }}
              className="relative mr-4 overflow-hidden rounded-lg bg-gray-200">
              
              {/* Giả sử bạn có promo.image, nếu không dùng màu Gradient làm nền */}
              <LinearGradient
                colors={isPercent ? [COLOR.PRIMARY, '#fbbf24'] : [COLOR.ESPRESSO, COLOR.CLAY]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute h-full w-full"
              />

              {/* Lớp phủ họa tiết nhẹ (Overlay) */}
              <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/25" />
              <View className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-primary/50" />

              <View className="flex-1 flex-row p-5">
                {/* Nội dung bên trái */}
                <View className="flex-1 justify-between">
                  <View>
                    <View className="self-start rounded-full bg-white/70 px-3 py-1">
                      <Text className="text-[10px] font-bold uppercase text-gray-500">
                        {isPercent ? 'Flash Sale' : 'Voucher Giảm Giá'}
                      </Text>
                    </View>
                    <Text 
                      numberOfLines={2} 
                      className="mt-2 text-xl font-bold leading-7 text-charcoal"
                    >
                      {promo.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    {/* <View className="rounded-lg bg-white px-3 py-1.5">
                      <Text className="text-sm font-black text-gray-800">
                        NHẬN NGAY
                      </Text>
                    </View> */}
                  </View>
                </View>

                {/* Nội dung bên phải (Giá trị giảm) */}
                <View className="items-end justify-center pt-20">
                   <Text className="text-4xl font-black text-primary">
                    {isPercent ? `${promo.value}%` : `${promo.value.toLocaleString()}Đ`}
                  </Text>
                  <Text className="text-[12px] font-bold uppercase tracking-widest text-clay">
                    OFF
                  </Text>
                </View>
              </View>

              {/* Nút hành động nổi */}
              
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PromotionSection;