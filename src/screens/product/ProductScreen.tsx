import { Categories } from "@/components/home/model/categoryResponse";
import { getCategoriesByFranchise } from "@/components/home/service/category.client.service";
import CategoryMenu from "@/components/product/Category.product";
import { useScroll } from "@/context/TabContext";
import { useFranchiseStore } from "@/store/useFranchiseStore";
import { useEffect, useMemo, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "./model/ProductResponse";
import { getProductsByCategory } from "./service/product.service";
import CardProduct from "@/components/product/Card.product";
import PromotionSection from "@/components/product/Promotion.product";
import Ionicons from '@expo/vector-icons/Ionicons';


const ProductScreen = () => {
  const [categories, setCategories] = useState<Categories[] >([]);
  const [activeCategory, setActiveCategory] = useState<Categories | undefined>(undefined);
  const [product , setProduct] = useState<Product[] | undefined>([]);
  const [sortType, setSortType] = useState<string>(''); // 'asc' | 'desc'
  const [searchName, setSearchName] = useState<string>('');
  const scrollY = useScroll();
  const franchise = useFranchiseStore();
    // console.log(franchise.selectedFranchise?.id);
    const fetchCategories = async (franchiseId: string) => {
      try {
        const res = await getCategoriesByFranchise(franchiseId);
        if (res) {
          setCategories(res);
          setActiveCategory(res[0]);
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

    const fetchProducts = async (franchiseId: string, categoryId: string) => {
      try{
        const res = await getProductsByCategory(franchiseId, categoryId);
        if (res) {
          setProduct(res.data[0]?.products);
        }
      } catch (error) {
        console.error('Error fetching products in component:', error);
      }
    };

    const handleSetSortType = () =>{
      if(sortType === 'asc') setSortType('desc');
      else if(sortType === 'desc') setSortType('');
      else setSortType('asc');
    }

    useEffect(() => {
      if (franchise.selectedFranchise && activeCategory) {
        fetchProducts(franchise.selectedFranchise?.id, activeCategory.category_id);
      }
    }, [franchise.selectedFranchise, activeCategory]);

    const filteredData = useMemo(() => {
      if (!product) return [];

      let result = [...product];

      // Filter theo tên
      if (searchName) {
        const keyword = searchName.trim().toLowerCase();
        result = result.filter((p) => p.name.toLowerCase().includes(keyword));
      }

      // Sắp xếp
      if (sortType === 'asc') result.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
      if (sortType === 'desc') result.sort((a, b) => b.sizes[0].price - a.sizes[0].price);

      return result;
    }, [product, sortType, searchName]);

    // console.log(product);

  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: 'white' }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: false,
      })}
      scrollEventThrottle={16}>
      <SafeAreaView className="pt-24">
        {/* Banner promotion */}
        <PromotionSection />
        {/* Category menu */}
        <CategoryMenu
          categories={categories}
          activeCategory={activeCategory || categories[0]}
          setActiveCategory={setActiveCategory}
        />
        <View className="px-5 pt-6">
          <Text className="font-poppins-bold text-2xl text-primary">
            {activeCategory?.category_name}
          </Text>
        </View>
        <View className="px-5 pt-4">
          <View className="flex-row rounded-2xl border border-gray-300 bg-white px-4 py-3 ">
            <Ionicons name="search-outline" size={19} color="#9CA3AF" />
            <TextInput
              value={searchName}
              onChangeText={setSearchName}
              placeholder="Tìm kiếm sản phẩm..."
              placeholderTextColor="#9CA3AF"
              className="font-poppins-regular text-base text-charcoal pl-1"
            />
          </View>

          <View className="mt-3 flex-row flex-wrap gap-2 justify-end">
            <Pressable
              onPress={handleSetSortType}
              className={`rounded-xl border px-4 py-2 w-1/4 ${sortType !== '' ? 'border-primary bg-primary' : 'border-gray-200 bg-white'}`}>
              <Text className={`text-sm font-semibold ${sortType !== '' ? 'text-white' : 'text-charcoal'}`}>
                {sortType === 'asc' ? (
                  <View className="flex-row items-center">
                    <Ionicons name="chevron-down" size={24} color="white" />
                    <Text className="text-white font-poppins-medium text-lg pl-1">Giảm</Text>
                  </View>           
                ) : sortType === 'desc' ? (
                  <View className="flex-row items-center">
                    <Ionicons name="chevron-up" size={24} color="white" className="" />
                    <Text className="text-white font-poppins-medium text-lg pl-1">Tăng </Text>
                  </View>
                  
                ) : (
                  <View className="flex-row items-center">
                    <Ionicons name="funnel" size={24} color="black" />
                    <Text className="text-charcoal font-poppins-medium text-lg pl-1"> Lọc </Text>
                  </View>
                )}
              </Text>
            </Pressable>
          </View>
        </View>
        {/* Product list */}
        <View className="flex-1 flex-row flex-wrap px-3 py-5">
          {/* Render products here */}
          {filteredData.map((product) => (
            <CardProduct
              key={product?.product_id}
              product={product}
              onPress={() => console.log('detail')}
              onAdd={() => console.log('add')}
            />
          ))}
        </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}

export default ProductScreen