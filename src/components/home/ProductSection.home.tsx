import { Text, View } from "react-native";
import CardProduct from "../product/Card.product";

const ProductSection= () => {
    const products = [
    {
      title: "Ethiopia Yirgacheffe",
      description: "Floral, Citrus, Light Roast",
      price: "350.000₫",
      imageUrl: "https://...",
    },
    {
      title: "Obsidian Cold Brew",
      description: "Smooth, Cocoa, 24h Steep",
      price: "85.000₫",
      imageUrl: "https://...",
    },
  ];
  return (
    <View className="py-12 px-4">
      
      {/* Header */}
      <View className="flex-row justify-between items-end mb-6">
        <View>
          <Text className="text-2xl font-bold text-primary">
            Curated Selection
          </Text>
          <Text className="text-sm text-clay mt-1">
            Our master favorites
          </Text>
        </View>

        <Text className="text-sm text-primary">Tất cả →</Text>
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap">
        {products.map((item, index) => (
          <CardProduct
            key={index}
            {...item}
            onPress={() => console.log("detail")}
            onAdd={() => console.log("add")}
          />
        ))}
      </View>
    </View>
  )
}



export default ProductSection