import CinematicHero from "@/components/home/CinematicHero.home"
import ProductSection from "@/components/home/ProductSection.home"
import { Animated } from "react-native"
// import { useRef, useEffect } from 'react'
import { useScroll } from "@/context/TabContext"
import CategorySection from "@/components/home/CategorySection.home"
import VoucherSection from "@/components/home/VoucherSection.home"

const HomeScreen = () => {
  const scrollY = useScroll();
  // const scrollYFallback = useRef(new Animated.Value(0)).current;
  // const activeScrollY = scrollY || scrollYFallback;
  // useEffect(() => {
  //   navigation.setParams({ scrollY });
  // }, [scrollY, navigation ]);

  return (
    <>
      <Animated.ScrollView
        className=""
        style={{ flex: 1, }}
       onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
        scrollEventThrottle={16}
      >
        <CinematicHero/>
        <CategorySection/>
        <VoucherSection/>
        <ProductSection/>
      </Animated.ScrollView>  
    </>
  )
}



export default HomeScreen