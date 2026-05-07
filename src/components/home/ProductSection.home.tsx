import { Text, View } from "react-native";
import CardProduct from "../product/Card.product";
import { Product } from "./model/productResponse";
import { useEffect, useState } from "react";
import { useFranchiseStore } from "@/store/useFranchiseStore";
import { getProductByFranchise } from "./service/product.client.service";

const ProductSection= () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const franchise = useFranchiseStore();
   
  const fetchProducts = async (franchiseId: string, categoryId?: string) => {
    try {
      const res = await getProductByFranchise(franchiseId, categoryId);
      if (res) {
        setProducts(res);
        // console.log(res.filter(product => product.category_name !== "Topping" && product.sizes.filter(size => size.is_available === false).length > 0));
      }
    } catch (error) {
      console.error('Error fetching products in component:', error);
    }
  };

  useEffect(() => {
    if (franchise.selectedFranchise) {
      fetchProducts(franchise.selectedFranchise?.id);
    }
  }, [franchise.selectedFranchise]);

  useEffect(() => {
    const filtered = products.filter(product => product.category_name !== "Topping" && product.sizes.filter(size => size.is_available === true).length > 0);
    setFilterProducts(filtered);
  } , [products]);

  return (
    <View className="py-12 px-4">
      
      {/* Header */}
      <View className="flex-row justify-between items-end mb-6">
        <View>
          <Text className="text-2xl font-bold text-primary">
            Sản phẩm
          </Text>
          <Text className="text-sm text-clay mt-1">
            sản phẩm nổi bật
          </Text>
        </View>

        <Text className="text-sm text-primary">Tất cả →</Text>
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap">
        {filterProducts.map((item, index) => (
          <CardProduct
            key={index}
            product={item}
            onPress={() => console.log("detail")}
            onAdd={() => console.log("add")}
          />
        ))}
      </View>
    </View>
  )
}



export default ProductSection