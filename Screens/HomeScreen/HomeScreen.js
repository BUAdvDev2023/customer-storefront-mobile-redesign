import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getShoeData from './shoes';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar } from 'react-native-screens';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

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
            <View style={{flexDirection:'row'}}>
            <Text style={styles.headerText}>ADVANCED DEVELOPMENT LTD.</Text>
            <TouchableOpacity style={styles.profileButton} onPress={() => {navigation.navigate('Profile')}}>
              <Ionicons name='person' size={20}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:17}}>
            <TouchableOpacity>
                <Text style={styles.activeTabText}>HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Contact')}}>
                <Text style={styles.tabText}>CONTACT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Basket')}}>
                <Text style={styles.tabText}>BASKET</Text>
            </TouchableOpacity>
            </View>


        </View>


        <View style={styles.searchBar}>
          <Ionicons name='search-outline' size={20} style={{marginLeft:10}}/>
          <TextInput 
          style={styles.search}
          placeholder='Search'
          value={shoeSearch}
          onChangeText={setShoeSearch}
          />
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'transparent'}}>

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
          style={{width:120, borderRadius:20, minHeight:20}}
          containerStyle={{width:120,marginLeft:0, marginTop:10}}
          textStyle={{fontSize:10}}
          labelStyle={{fontSize:10}}
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
          style={{width:120, borderRadius:50, minHeight:20}}
          containerStyle={{width:120,marginLeft:0, marginTop:10,}}
          textStyle={{fontSize:10}}
          labelStyle={{fontSize:10}}
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
          style={{width:120, borderRadius:50, minHeight:20}}
          containerStyle={{width:120,marginLeft:0, marginTop:10}}
          textStyle={{fontSize:10}}
          labelStyle={{fontSize:10}}
          />

        </View>
        
        <FlatList
        style={{flex:1, margin:5, zIndex:-5}}
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
       <View style={{backgroundColor:'#efeff1', borderTopLeftRadius:20, borderTopRightRadius:20}}>
          <Image style={{width:170, height:110, alignSelf:'center', marginTop:3, borderRadius:20}} source={{uri:props.imageLink}}/>
        </View>
          <View>
            <Text style={{fontWeight:900, marginTop:10, alignSelf:'center', fontSize:10, }}>{props.shoeName.toUpperCase()}</Text>
            <Text style={{alignSelf:'center', marginTop:7, fontWeight:500, fontSize:13}}>£{props.price}</Text>
            <Text style={{fontSize:7, alignSelf:'center', textAlign:'center', margin:10}}>{props.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={{fontSize:9, textAlign:'center'}}>ADD TO BASKET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={{fontSize:9, textAlign:'center'}}>MORE DETAILS</Text>
            </TouchableOpacity>
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
    height:127,
    backgroundColor:'black',
  },
  headerText: {
    color:'white',
    fontSize:15,
    marginTop:55,
    marginLeft:5,
    fontWeight:'bold',
    letterSpacing:0.7
  },
  tabText: {
    color:'white',
    fontSize:10,
    fontWeight:'bold'
  },
  activeTabText: {
    color:'#00bfff',
    fontSize:10,
    fontWeight:'bold'
  },
  row: {
    flex:1/2,
    height:270,
    margin:7,
    marginBottom:0,
    width:'20%',
    borderRadius:20,
    color:'black',
    fontWeight:'bold',
    backgroundColor:'#f6f6f6',
    shadowColor:'black',
    shadowOpacity:0.4,
    shadowRadius:6,
  },
  button: {
    backgroundColor:'white',
    width:120,
    height:20,
    alignSelf:'center', 
    borderRadius:20,
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowRadius:3,
    shadowOffset:{width:2, height:2},
    justifyContent:'center',
    marginBottom:5
  },
  search: {
    fontSize:14,
    marginLeft:10,
    width:'90%'
  },
  searchBar: {
    padding:0,
    flexDirection:'row',
    width:'95%',
    backgroundColor:'#d9dbda',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'space-evenly',
    alignSelf:'center',
    marginTop:10,
    height:29
  },
  profileButton: {
    height:40,
    width:40,
    backgroundColor:'gray',
    borderRadius:20,
    marginLeft:70,
    marginTop:50,
    alignItems:'center',
    justifyContent:'center'
  }
});
