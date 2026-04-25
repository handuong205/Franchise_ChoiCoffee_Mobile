import { Animated, Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import logo from '../../../assets/logo/Logo.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import FranchiseSelect from '@/components/franchise/FranchiseSelect';
import { useFranchiseStore } from '@/store/useFranchiseStore';
import { useScroll } from '@/context/TabContext';
import { Franchise } from './model/franchisesReponse.model';
import { getAllPublicFranchsies } from './service/franchises.service';

const Header = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollY = useScroll();

  // const franchise = [
  //   {
  //     id: '1',
  //     code: 'FR1',
  //     name: 'Franchise 1',
  //     address: '123 Main St, City A',
  //   },
  //   {
  //     id: '2',
  //     name: 'Franchise 2',
  //     address: '456 Elm St, City B',
  //   },
  //   {
  //     id: '3',
  //     name: 'Franchise 3',
  //     address: '789 Oak St, City C',
  //   },
  //   {
  //     id: '4',
  //     name: 'Franchise 4',
  //     address: '321 Pine St, City D',
  //   },
  //   {
  //     id: '5',
  //     name: 'Franchise 5',
  //     address: '654 Maple St, City E',
  //   },
  //   {
  //     id: '6',
  //     name: 'Franchise 6',
  //     address: '987 Cedar St, City F',
  //   },
  //   {
  //     id: '7',
  //     name: 'Franchise 7',
  //     address: '246 Birch St, City G',
  //   },
  //   {
  //     id: '8',
  //     name: 'Franchise 8',
  //     address: '135 Spruce St, City H',
  //   },
  //   {
  //     id: '9',
  //     name: 'Franchise 9',
  //     address: '246 Fir St, City I',
  //   },
  //   {
  //     id: '10',
  //     name: 'Franchise 10',
  //     address: '135 Willow St, City J',
  //   },
  //   {
  //     id: '11',
  //     name: 'Franchise 11',
  //     address: '246 Aspen St, City K',
  //   },
  //   {
  //     id: '12',
  //     name: 'Franchise 12',
  //     address: '135 Redwood St, City L',
  //   },
  // ];

  const [franchises, setFranchise] = useState<Franchise[]>([]);

  const fetchFranchises = async () => {
    try{
      const res = await getAllPublicFranchsies();
      if(res){
        setFranchise(res.data);
      }
    }catch(error){
      console.error("Error fetching franchises:", error);
    }
  };

  useEffect(() => {
    fetchFranchises();
  }, []);

  const { selectedFranchise, setSelectedFranchise } = useFranchiseStore();

  useEffect(() => {
    if (!selectedFranchise && franchises.length > 0) {
      setSelectedFranchise(franchises[0]);
    }
  }, [franchises]);

  const snapPoints = useMemo(() => ['50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} opacity={0.2} appearsOnIndex={0} disappearsOnIndex={-1} />
  );

  const handleFranchiseSelect = (franchise: Franchise) => {
    setSelectedFranchise(franchise);
  };

  const backgroundColor = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
        extrapolate: 'clamp',
      })
    : 'transparent';

  const translateY = scrollY
  ? scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -120], // -120 đảm bảo đẩy toàn bộ header ra khỏi màn hình
      extrapolate: 'clamp',
    })
  : 0;

  const opacity = scrollY
  ? scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })
  : 1;

  return (
    <Animated.View
      style={{
        paddingTop: insets.top,
        backgroundColor: backgroundColor,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: opacity, 
      transform: [{ translateY: translateY }]
      }}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center gap-2">
          <Image source={logo} className="h-10 w-10 rounded-full" />
          <View>
            <Text className="font-poppins-bold text-xl text-primary">ChoiCoffee</Text>
            <Text className="font-poppins-regular text-xs text-gray-500">HERITAGE COFFE</Text>
          </View>
        </View>
        <Pressable
          onPress={handlePresentModalPress}
          className="flex-row items-center justify-center gap-1">
          <Ionicons name="location-sharp" size={24} color="#e69019" />
          <Text className="font-poppins-medium text-sm text-gray-500">
            {selectedFranchise?.name}
          </Text>
        </Pressable>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        // enableHandlePanningGesture={false}
        enableDynamicSizing={false}>
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          <View className="mb-4">
            <View className="">
              <FranchiseSelect
                franchise={franchises}
                selectedFranchise={selectedFranchise as any}
                onSelect={handleFranchiseSelect}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </Animated.View>
  );
};

export default Header;
