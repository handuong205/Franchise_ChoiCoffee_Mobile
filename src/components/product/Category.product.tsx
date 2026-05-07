import { Pressable, ScrollView, Text, View } from 'react-native';
import { Categories } from '../home/model/categoryResponse';
import { useEffect } from 'react';

export type CategoryMenuProps = {
  categories: Categories[];
  activeCategory: Categories;
  setActiveCategory: (category: Categories) => void;
};

const CategoryMenu = (props: CategoryMenuProps) => {
  //   console.log(props.activeCategory);

  return (
    <ScrollView
      className="flex-row"
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}>
      {props.categories.map((category) => (
        <Pressable
          key={category.category_code}
          className="mr-4 py-2"
          onPress={() => props.setActiveCategory && props.setActiveCategory(category)}>
          <View
            className={`rounded-full px-6 py-2 shadow-sm ${props.activeCategory === category ? 'bg-primary' : 'bg-gray-200'}`}
            style={{
              elevation: 3,
            }}>
            <Text
              className={`
            ${props.activeCategory === category ? 'text-white' : 'text-clay'} 
            ${props.activeCategory === category ? 'font-poppins-bold' : 'font-poppins-regular'}
            text-lg`}>
              {category.category_name}
            </Text>
          </View>
          
        </Pressable>
        
      ))}
      
    </ScrollView>
  );
};

export default CategoryMenu;
