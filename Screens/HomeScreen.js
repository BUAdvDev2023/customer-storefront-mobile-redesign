import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Modal, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getShoeData from './shoes';
import { Ionicons } from '@expo/vector-icons';
import CustomCheckbox from './CustomCheckbox'; // Import the custom checkbox

const Stack = createStackNavigator();
const { height } = Dimensions.get('window');

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Default" component={DefaultHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DefaultHomeScreen() {
  const [shoeData, setShoeData] = useState(getShoeData());
  const [shoeSearch, setShoeSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    if (route.params?.filters) {
      const { selectedPrices, selectedColors } = route.params.filters;
      setSelectedPrices(selectedPrices);
      setSelectedColors(selectedColors);
    }
  }, [route.params?.filters]);

  useEffect(() => {
    const filteredData = getShoeData().filter((item) => {
      const priceMatch = selectedPrices.length ? selectedPrices.some(price => item.price <= parseInt(price.replace('£', ''), 10)) : true;
      const colorMatch = selectedColors.length ? selectedColors.includes(item.color1) || selectedColors.includes(item.color2) : true;
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      return priceMatch && colorMatch && categoryMatch && item.name.toUpperCase().includes(shoeSearch.toUpperCase());
    });
    setShoeData(filteredData);
  }, [selectedPrices, selectedColors, selectedCategory, shoeSearch]);

  const handleApplyFilters = (filters) => {
    setSelectedPrices(filters.selectedPrices);
    setSelectedColors(filters.selectedColors);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>ADVANCED DEVELOPMENT LTD.</Text>
          <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        {['All', 'Mens', 'Womens', 'Kids'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.tabItem, selectedCategory === category && styles.activeTabItem]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.tabText, selectedCategory === category && styles.activeTabText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        style={styles.flatList}
        data={shoeData}
        numColumns={2}
        renderItem={({ item }) => (
          <ListItem shoeName={item.name} imageLink={item.image_url} price={item.price} description={item.description} category={item.category} />
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <FilterScreen
            selectedPrices={selectedPrices}
            selectedColors={selectedColors}
            onApplyFilters={handleApplyFilters}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const ListItem = (props) => (
  <View style={styles.row}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: props.imageLink }} />
    </View>
    <View>
      <Text style={styles.shoeName}>{props.shoeName.toUpperCase()}</Text>
      <Text style={styles.shoeDescription}>{props.description}</Text>
      <Text style={styles.shoePrice}>£{props.price}</Text>
    </View>
  </View>
);

function FilterScreen({ selectedPrices, selectedColors, onApplyFilters, onClose }) {
  const [prices, setPrices] = useState(selectedPrices);
  const [colors, setColors] = useState(selectedColors);

  const handlePriceSelection = (price) => {
    setPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const handleColorSelection = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleApply = () => {
    onApplyFilters({ selectedPrices: prices, selectedColors: colors });
  };

  return (
    <View style={styles.modalView}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.filterTitle}>Filter</Text>

      <Text style={styles.priceFilterTitle}>Shop By Price</Text>
      <View style={styles.priceOptions}>
        {['Under £90', '£100', '£130'].map((price) => (
          <View key={price} style={styles.priceBox}>
            <CustomCheckbox
              value={prices.includes(price)}
              onValueChange={() => handlePriceSelection(price)}
            />
            <Text style={styles.priceText}>{price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.filterLine}></View>

      <Text style={styles.colourFilterTitle}>Shop By Colours</Text>
      <View style={styles.colorOptions}>
        {['Black', 'White', 'Green', 'Blue', 'Purple', 'Pink', 'Red', 'Grey'].map((color) => (
          <View key={color} style={styles.colorBox}>
            <CustomCheckbox
              value={colors.includes(color)}
              onValueChange={() => handleColorSelection(color)}
            />
            <Text style={styles.colorText}>{color}</Text>
          </View>
        ))}
      </View>
      <View style={styles.filterActions}>
        <TouchableOpacity style={styles.resetButton} onPress={() => { setPrices([]); setColors([]); }}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [shoeData, setShoeData] = useState(getShoeData());
  const navigation = useNavigation();

  useEffect(() => {
    const filteredData = getShoeData().filter((item) =>
      item.name.toUpperCase().includes(searchText.toUpperCase())
    );
    setShoeData(filteredData);
  }, [searchText]);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          {/*<Ionicons name="arrow-back" size={24} color="black" />*/}
          <Text style={styles.searchCancelText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={22} style={styles.searchIcon} />
          <TextInput
            style={styles.search}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <FlatList
        style={styles.flatList}
        data={shoeData}
        numColumns={2}
        renderItem={({ item }) => (
          <ListItem shoeName={item.name} imageLink={item.image_url} price={item.price} description={item.description} category={item.category} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 85,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 15,
    marginTop: 55,
    marginLeft: 10,
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
  filterButton: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  searchButton: {
    position: 'absolute',
    top: 50,
    right: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 0,
    marginBottom: 20,
  },
  tabItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    color: 'gray',
    fontSize: 16,
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
    margin: 0,
    zIndex: -5,
  },
  row: {
    flex: 1 / 2,
    height: 230,
    margin: 7,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    backgroundColor: '#efeff1',
  },
  image: {
    width: 170,
    height: 110,
    alignSelf: 'center',
    marginTop: 3,
  },
  shoeName: {
    fontWeight: '700',
    marginTop: 10,
    fontSize: 10,
    marginLeft: 10,
  },
  shoePrice: {
    fontWeight: '500',
    fontSize: 10,
    marginLeft: 10,
  },
  shoeDescription: {
    fontSize: 10,
    marginLeft: 10,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    paddingHorizontal: 0,
    backgroundColor: 'white',
    height: height * 0.8,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  priceFilterTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  priceOptions: {
    width: '100%',
    marginBottom: 20,
    marginLeft: 20,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  priceText: {
    marginLeft: 5,
    fontSize: 16,
  },
  filterLine: {
    height: 1,
    backgroundColor: '#555',
    marginHorizontal: 20,
  },
  colourFilterTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  colorOptions: {
    width: '100%',
    marginBottom: 20,
    marginLeft: 20,
  },
  colorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  colorText: {
    marginLeft: 5,
    fontSize: 16,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
  },
  applyButton: {
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  resetButton: {
    padding: 15,
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginLeft: 10,
  },
  search: {
    fontSize: 16,
    marginLeft: 10,
    backgroundColor: 'transparent',
    width: '80%',
  },
  searchButtonText: {
    fontSize: 14,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchHeader: {
    //height: 85,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingLeft: 10,
    paddingRight: 70,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 5,
    height: 30,
    width: '100%',
  },
  searchCancelText: {
    fontSize: 16,
    color: '#888',
    //backgroundColor: 'green',
  },
});

export default HomeScreen;
