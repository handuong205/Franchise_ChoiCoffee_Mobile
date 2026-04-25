import { Image, Pressable, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient";

const CinematicHero = () => {
  return (
    <View className="relative h-[530px] w-full justify-end px-6 pb-12 ">
      {/* Background */}
      <View className="absolute inset-0 z-0">
        <Image
          source={{
            uri: 'null',
          }}
          className="h-full w-full"
          resizeMode="cover"
        />

        {/* Gradient overlays (cần lib) */}
        {/* Khuyên dùng expo-linear-gradient */}
        {/* Gradient 1: từ dưới lên */}
        <LinearGradient
          colors={[
            'rgba(229,229,229,0)', // top: transparent
            'rgba(229,229,229,0.3)',
            'rgba(229,229,229,0.7)',
            'rgba(229,229,229,1)', // bottom: full màu
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
        />

        {/* Gradient 2: chéo */}
        <LinearGradient
          colors={[
            'rgba(255,140,0,0.3)', // đậm ở dưới-trái
            'rgba(255,140,0,0.1)',
            'transparent',
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
        />
      </View>

      {/* Content */}
      <View className="relative z-10 w-full max-w-2xl">
        <Text className="mb-2 font-poppins-regular text-sm uppercase tracking-widest text-primary">
          Origin Reserve
        </Text>

        <Text className="mb-4 font-poppins-bold text-4xl leading-tight text-clay">
          The Midnight{'\n'}Roast
        </Text>

        <Text className="mb-6 max-w-md font-poppins-regular text-sm text-text-charcoal">
          Experience the depth of our darkest roast. Notes of dark chocolate, black cherry, and
          smoked oak.
        </Text>

        <Pressable className="rounded bg-primary px-6 py-3 font-poppins-regular">
          <Text className="font-semibold text-charcoal">Explore Blend</Text>
        </Pressable>
      </View>

      {/* Indicators */}
      <View className="absolute bottom-6 right-6 z-10 flex-row space-x-2">
        <View className="h-1 w-8 rounded-full bg-[#fbbc00]" />
        <View className="h-1 w-4 rounded-full bg-gray-400" />
        <View className="h-1 w-4 rounded-full bg-gray-400" />
      </View>
    </View>
  );
}



export default CinematicHero