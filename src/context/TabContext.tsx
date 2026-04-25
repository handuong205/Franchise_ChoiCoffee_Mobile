import React, { createContext, useContext, useRef } from 'react';
import { Animated } from 'react-native';
import { useSharedValue, SharedValue } from 'react-native-reanimated';


const ScrollContext = createContext<{ scrollY: Animated.Value } | null>(null);


export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  // scrollY lưu vị trí cuộn (0, 10, 100...)
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
 const context = useContext(ScrollContext);
  if (!context) throw new Error("useScroll must be used within ScrollProvider");
  return context.scrollY;
};