import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getShoeData from '../HomeScreen/shoes';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { SearchBar } from 'react-native-screens';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import getBasketShoeData from './basketShoes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

export default function BasketScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Default' component={DefaultBasketScreen} options={{headerShown:false, presentation:'containedModal'}}/>
      <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown:false, presentation:'containedModal'}}/>
    </Stack.Navigator>
  );
}


function DefaultBasketScreen() {

  let items2 = getBasketShoeData();
  const [basketShoeData, setBasketShoeData] = useState(items2);

  let items = getShoeData();
  const [shoeData, setShoeData] = useState(items);

  const [addElementState, setAddElementState] = useState(items2);
  const [idx, incr] = useState(2);

  const addElement = () => {
    var newArray = [ ...basketShoeData, {name:'idk', price:1.23, id:(idx+1)}];
    incr(idx+1);
    setAddElementState(newArray);
    setBasketShoeData(newArray);
  }

  const navigation = useNavigation();

  var numberItems = items2.length;
  var numberItemsText = '';

  if (numberItems == 1) {
    numberItemsText = 'item'
  } else {
    numberItemsText = 'items'
  };

  var subtotal = items2.map(element => element.price).reduce((a,b) => a+b,0);

  

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
            <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
                <Text style={styles.tabText}>HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Contact')}}>
                <Text style={styles.tabText}>CONTACT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Basket')}}>
                <Text style={styles.activeTabText}>BASKET</Text>
            </TouchableOpacity>
            </View>
        </View>



        <FlatList
        style={{flex:1, margin:5, zIndex:-5}}
        data={basketShoeData}
        renderItem={({item}) => (
          <ListItem shoeName={item.name} imageLink={item.image_url} price={item.price} description={item.description} category={item.category} />
        )}
        keyExtractor={(item)=>item.id}
        />

            <Text style={{marginLeft:27, marginBottom:15, marginTop:15}}>Subtotal : £{subtotal} ({numberItems} {numberItemsText})</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={{fontSize:15, fontWeight:'bold', letterSpacing:0.7,textAlign:'center'}} onPress={addElement}>CHECKOUT</Text>
            </TouchableOpacity>
        
      </View>
  );
};

function removeItem(id) {
  var i = (id-1)
  delete newArray[1];
};

const ListItem = (props) => {
  return (
      <View style={styles.row}>
       <View style={{backgroundColor:'#efeff1', borderTopLeftRadius:20, borderBottomLeftRadius:20}}>
          <Image style={{width:120, height:110, alignSelf:'center', marginTop:3, borderRadius:20}} source={{uri:props.imageLink}}/>
        </View>
          <View>
            <Text style={{fontWeight:900, marginTop:20, marginLeft:10,fontSize:10, }}>{props.shoeName.toUpperCase()}</Text>
            <Text style={{marginLeft:10, marginTop:7, fontWeight:500, fontSize:13}}>£{props.price}</Text>
            <TouchableOpacity style={styles.button} onPress={removeItem}>
              <Text style={{fontSize:9, textAlign:'center'}}>REMOVE</Text>
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
    flex:1,
    flexDirection:'row',
    height:120,
    margin:18,
    marginBottom:0,
    width:'90%',
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
    marginTop:32,
    marginLeft:80, 
    borderRadius:20,
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowRadius:3,
    shadowOffset:{width:2, height:2},
    justifyContent:'center',
  },
  checkoutButton: {
    backgroundColor:'#76d01c',
    width:350,
    height:50,
    alignSelf:'center', 
    marginBottom:40,
    borderRadius:50,
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowRadius:3,
    shadowOffset:{width:2, height:2},
    justifyContent:'center',
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
