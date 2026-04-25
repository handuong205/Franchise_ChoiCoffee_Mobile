import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Pressable, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { Franchise } from "../layouts/header/model/franchisesReponse.model";



type FranchiseSelectProps = {
    franchise: Franchise[];
    selectedFranchise: Franchise;
    onSelect: (franchise: Franchise) => void;
};

const FranchiseSelect = (props: FranchiseSelectProps) => {
  return (
        <BottomSheetFlatList
            data={props.franchise}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 10}}
            style={{ maxHeight: 350 }}
            ListHeaderComponent={() => (
                <View className="flex-row">
                    <Ionicons name="location-sharp" size={24} color="#e69019" className="ml-2" /> 
                  <Text className="text-primary font-poppins-bold mb-4 uppercase text-lg tracking-widest">
                    Chọn chi nhánh gần bạn
                </Text> 
                
                </View>
                
            )}
            renderItem={({ item }) => {
                const isSelected = props.selectedFranchise?.id === item.id;
                return (
                    
                <Pressable 
                onPress={() => props.onSelect(item)}
                
                        className={`mb-3 flex-row items-center justify-between rounded-2xl border p-4 ${
                            isSelected 
                                ? "bg-primary/10 border-primary" 
                                : "bg-white border-gray-100"
                        }`}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: isSelected ? 0 : 0.05,
                            shadowRadius: 4,
                            elevation: isSelected ? 0 : 2,
                            
                        }}
                >
                    <View className="flex-1 pr-4">
                            <Text className={`font-poppins-semibold text-base ${
                                isSelected ? "text-primary" : "text-clay"
                            }`}>
                                {item.name}
                            </Text>
                            <Text className="font-poppins-regular text-sm text-slate-500 mt-1" numberOfLines={1}>
                                {item.code}
                            </Text>
                        </View>
                        {isSelected && (
                            <View className="bg-primary rounded-full p-1">
                                <Ionicons name="checkmark" size={16} color="white" strokeWidth={3} />
                            </View>
                        )}
                </Pressable>
            )}}
        >
        </BottomSheetFlatList>
    
  )
}

export default FranchiseSelect