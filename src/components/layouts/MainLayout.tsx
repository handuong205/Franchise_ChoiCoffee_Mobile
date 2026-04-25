import { ScrollView, View } from "react-native"
import Header from "./header/Header.main"
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  const tabBarTranslateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrollingDown = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;

      if(Math.abs(currentOffset - - lastContentOffset.value) > 10){
        if(currentOffset > lastContentOffset.value && currentOffset > 50) {
          tabBarTranslateY.value = 100;
        }else{
          tabBarTranslateY.value = 0;
        }
      }
      lastContentOffset.value = currentOffset;
    }
  })
  return (
    <View className="flex-1">
        {/* <Header/> */}
        <View className="flex-1">
            {props.children}
        </View>
        {/* <Footer/> */}
    </View>
  )
}
export default MainLayout