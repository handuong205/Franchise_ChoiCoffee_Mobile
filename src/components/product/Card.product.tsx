import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { Product } from '../home/model/productResponse'

type CardProductProps = {
  product: Product,
  onPress: () => void,
  onAdd: () => void,
  className?: string,
}

const CardProduct = (props: CardProductProps) => {
  return (
    <Pressable onPress={props.onPress } className={`mb-6 w-1/2 px-2 ${props.className || ''}`}>
      <View className="relative mb-3 overflow-hidden rounded-xl ">
        {/* Image */}
        <Image source={{ uri: props.product.image_url }} className="h-48 w-full" resizeMode="cover" />

        {/* Gradient overlay (giữ text rõ) */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />

        {/* Add button */}
        <Pressable
          onPress={props.onAdd }
          className="absolute bottom-2 right-2 h-10 w-10 items-center justify-center rounded-full bg-white/80">
          <Text className="text-lg font-bold">+</Text>
        </Pressable>
      </View>

      {/* Info */}
      <Text className="text-base font-bold text-charcoal">{props.product.name}</Text>

      {/* <Text className="mt-1 text-xs text-gray-400">{props.product.description}</Text> */}

      <Text className="mt-2 text-sm font-semibold text-orange-400">{props.product.sizes[0].price.toLocaleString()}Đ</Text>
    </Pressable>
  );
}

export default CardProduct