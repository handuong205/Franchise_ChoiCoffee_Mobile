import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useTabVideo } from "@/context/TabContext";

export const useAnimatedTabBarStyle = () => {
    const tabBarTranslateY = useTabVideo();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(tabBarTranslateY.value) }],
    }));

    return animatedStyle;
};
