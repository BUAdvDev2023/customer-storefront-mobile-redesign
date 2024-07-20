import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getShoeData from './shoes';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Default' component={DefaultHomeScreen} options={{headerShown:false, presentation:'containedModal'}}/>
      <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown:false, presentation:'containedModal'}}/>
    </Stack.Navigator>
  );
}

function DefaultHomeScreen() {

  let items = getShoeData();
  const [shoeData, setShoeData] = useState(items);

  const [ shoeSearch, setShoeSearch ] = useState('');

  const navigation = useNavigation();
  const [colorOpen, setColorOpen ] = useState(false);
  const [colorValue, setColorValue] = useState(null);
  const [colorItems, setColorItems] = useState([{label:'All Colors', value:'All'},{label:'Black', value:'Black'},{label:'White', value:'White'},{label:'Green', value:'Green'}, {label:'Blue', value:'Blue'},{label:'Purple', value:'Purple'}, {label:'Pink', value:'Pink'}, {label:'Red', value:'Red'}, {label:'Grey', value:'Grey'}]);
  const [catOpen, setCatOpen ] = useState(false);
  const [catValue, setCatValue] = useState(null);
  const [catItems, setCatItems] = useState([{label:'All Categories', value:'All'},{label:'Mens', value:'Mens'},{label:'Womens', value:'Womens'},{label:'Kids', value:'Kids'}]);
  const [priceOpen, setPriceOpen ] = useState(false);
  const [priceValue, setPriceValue] = useState(null);
  const [priceItems, setPriceItems] = useState([{label:'All Prices', value:'All'},{label:'under £90', value:'90'},{label:'under £100', value:'100'},{label:'under £130', value:'130'}]);

  var shoeColor = '';
  var shoeCategory = '';
  var shoePrice = 300;

  if (catValue == 'Mens') {
    shoeCategory = 'Mens'
  } else if (catValue == 'Womens') {
    shoeCategory = 'Womens'
  } else if (catValue == 'Kids') {
    shoeCategory = 'Kids'
  } else {
    shoeCategory = ''
  }

  if (colorValue == 'Black') {
    shoeColor = 'Black'
  } else if (colorValue == 'White') {
    shoeColor = 'White'
  } else if (colorValue == 'Green') {
    shoeColor = 'Green'
  } else if (colorValue == 'Blue') {
    shoeColor = 'Blue'
  } else if (colorValue == 'Purple') {
    shoeColor = 'Purple'
  } else if (colorValue == 'Pink') {
    shoeColor = 'Pink'
  } else if (colorValue == 'Red') {
    shoeColor = 'Red'
  } else if (colorValue == 'Grey') {
    shoeColor = 'Grey'
  } else {
    shoeColor = ''
  }

  if (priceValue == 90) {
    shoePrice = 90
  } else if (priceValue == 100) {
    shoePrice = 100
  } else if (priceValue == 130) {
    shoePrice = 130
  } else {
    shoePrice = 300
  }
  

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>ADVANCED DEVELOPMENT LTD.</Text>
              <TouchableOpacity style={styles.filterButton} onPress={() => { /* Filter functionality here */ }}>
                <Ionicons name='filter' size={24} color='black'/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchButton} onPress={() => { /* Search functionality here */ }}>
                <Ionicons name='search' size={24} color='black'/>
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name='search-outline' size={20} style={styles.searchIcon}/>
          <TextInput 
          style={styles.search}
          placeholder='Search'
          value={shoeSearch}
          onChangeText={setShoeSearch}
          />
        </View>

        <View style={styles.filterRow}>
          <DropDownPicker
          open={colorOpen}
          value={colorValue}
          items={colorItems}
          setOpen={setColorOpen}
          setValue={setColorValue}
          setItems={setColorItems}
          placeholder='Colour'
          maxHeight={190}
          disableBorderRadius={false}
          style={styles.dropdownPicker}
          containerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownLabel}
          searchable={true}
          autoScroll={true}
          />

          <DropDownPicker
          open={catOpen}
          value={catValue}
          items={catItems}
          setOpen={setCatOpen}
          setValue={setCatValue}
          setItems={setCatItems}
          placeholder='Category'
          maxHeight={190}
          disableBorderRadius={false}
          style={styles.dropdownPicker}
          containerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownLabel}
          />

          <DropDownPicker
          open={priceOpen}
          value={priceValue}
          items={priceItems}
          setOpen={setPriceOpen}
          setValue={setPriceValue}
          setItems={setPriceItems}
          placeholder='Price'
          maxHeight={190}
          disableBorderRadius={false}
          style={styles.dropdownPicker}
          containerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownLabel}
          />
        </View>
        
        <FlatList
        style={styles.flatList}
        data={shoeData.filter((item) => ( 
          (item.category).includes(shoeCategory) 
          && 
          ( (item.color1).includes(shoeColor) || (item.color2).includes(shoeColor) )
          &&
          ( item.price < shoePrice ) 
          &&
          ( (item.name.toUpperCase()).includes(shoeSearch.toUpperCase()) )
          ))}
        numColumns={2}
        renderItem={({item}) => (
          <ListItem shoeName={item.name} imageLink={item.image_url} price={item.price} description={item.description} category={item.category} />
        )}
        keyExtractor={(item)=>item.id}
        />
        
      </View>
  );
};

const ListItem = (props) => {
  return (
      <View style={styles.row}>
        <Ionicons name="bag-outline" size={20} color="black" style={styles.bagIcon} />
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri:props.imageLink}}/>
        </View>
        <View>
          <Text style={styles.shoeName}>{props.shoeName.toUpperCase()}</Text>
          <Text style={styles.shoeDescription}>{props.description}</Text>
          <Text style={styles.shoePrice}>£{props.price}</Text>
        </View>
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
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 17,
  },
  tabText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#00bfff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginTop: 10,
    height: 29,
  },
  searchIcon: {
    marginLeft: 10,
  },
  search: {
    fontSize: 14,
    marginLeft: 10,
    width: '90%',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
  dropdownPicker: {
    width: 120,
    borderRadius: 20,
    minHeight: 20,
  },
  dropdownContainer: {
    width: 120,
    marginLeft: 0,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 10,
  },
  dropdownLabel: {
    fontSize: 10,
  },
  flatList: {
    flex: 1,
    margin: 5,
    zIndex: -5,
  },
  row: {
    flex: 1 / 2,
    height: 230,
    margin: 7,
    marginBottom: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0.4,
    shadowRadius: 0,
  },
  imageContainer: {
    backgroundColor: '#efeff1',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  bagIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  image: {
    width: 170,
    height: 110,
    alignSelf: 'center',
    marginTop: 3,
    borderRadius: 0,
  },
  shoeName: {
    fontWeight: '700',
    marginTop: 10,
    alignSelf: 'left',
    fontSize: 10,
    marginLeft: 10,
  },
  shoePrice: {
    alignSelf: 'left',
    marginTop: 0,
    fontWeight: '500',
    fontSize: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  shoeDescription: {
    fontSize: 10,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    color: 'gray',
  },
  button: {
    backgroundColor: 'white',
    width: 120,
    height: 20,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 },
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 9,
    textAlign: 'center',
  },
});