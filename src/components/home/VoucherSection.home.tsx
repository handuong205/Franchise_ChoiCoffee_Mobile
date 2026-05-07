import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Voucher } from './model/promotionResponse';
import { getVoucherByFranchiseId } from './service/promotion.client.service';
import { useFranchiseStore } from '@/store/useFranchiseStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const GAP = 12;

const VoucherSection = () => {
  const [promotions, setPromotions] = useState<Voucher[]>([]);
  const [filterPromotions, setFilterPromotions] = useState<Voucher[]>([]);
  const franchiseId = useFranchiseStore((s) => s.selectedFranchise?.id);

  const fetchPromotions = async () => {
    try {
      if (!franchiseId) return;
      const res = await getVoucherByFranchiseId(franchiseId || '');
      if (res) setPromotions(res.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
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

  return (
    <View className="bg-gray-50 py-10">
      {/* Header Section */}
      <View className="mb-4 flex-row items-end justify-between px-6">
        <View>
          <Text className="text-2xl font-bold text-primary">Voucher đang có</Text>
        </View>
        {/* <Pressable>
          <Text className="text-sm font-semibold text-primary/70">Tất cả</Text>
        </Pressable> */}
      </View>

     
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + GAP}
        snapToAlignment="start"
        contentContainerStyle={{ paddingHorizontal: 24 }}>
        {filterPromotions.map((promo) => {
          const isPercent = promo.type === 'PERCENT';

          return (
            <View
              key={promo._id}
              style={{
                width: CARD_WIDTH,
                height: 130,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
              className="relative mr-3 flex-row overflow-hidden rounded-2xl border border-gray-100 bg-white">
              {/* 1. Phần Accent trái (Đầu vé) */}
              <LinearGradient
                colors={isPercent ? ['#f97316', '#fb923c'] : ['#3b82f6', '#60a5fa']}
                className="">
                <View className="flex h-full w-16 items-center justify-center">
                  <Ionicons name={isPercent ? 'flame' : 'gift'} size={28} color="white" />

                  <Text className="mt-1 px-3 text-[10px] font-bold uppercase text-white/90 ">
                    {isPercent ? 'Hot' : 'Save'}
                  </Text>
                </View>
              </LinearGradient>

              {/* 2. Phần Nội dung chính (Thân vé) */}
              <View className="flex-1 justify-center px-4">
                  {/* <Text
                    numberOfLines={1}
                    className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {isPercent ? 'Giảm theo %' : 'Giảm trực tiếp'}
                  </Text> */}
                <Text numberOfLines={1} className="mt-0.5 text-base font-bold text-primary">
                  {promo.code}
                </Text>
                <Text numberOfLines={1} className="mt-0.5 text-base font-bold text-gray-800">
                  {promo.name}
                </Text>
                
                <View className="mt-1 flex-row items-baseline">
                  <Text className="text-2xl font-black text-primary">
                    {isPercent ? `${promo.value}%` : `${promo.value / 1000}k`}
                  </Text>
                  <Text className="ml-1 text-[10px] font-bold uppercase text-gray-500">Ưu đãi</Text>
                </View>
              </View>

              {/* 3. Nét đứt ngăn cách (Dashed line) */}
              <View className="relative h-full w-[1px] border-l border-dashed border-gray-200" />

              {/* 4. Phần Cuống vé (Nút hành động) */}
              <View className="w-20 items-center justify-center bg-gray-50/50">
                <View className="absolute -top-2 h-4 w-4 rounded-full border border-gray-100 bg-gray-50" />
                <View className="absolute -bottom-2 h-4 w-4 rounded-full border border-gray-100 bg-gray-50" />

                <Pressable className="items-center justify-center active:opacity-60">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Ionicons name="chevron-forward" size={20} color="#e69019" />
                  </View>
                  <Text className="mt-1 text-[9px] font-bold text-primary">LẤY MÃ</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default VoucherSection;
