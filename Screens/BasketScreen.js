import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import getBasketShoeData from './basketShoes';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function BasketScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Default' component={DefaultBasketScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DefaultBasketScreen() {
  const [basketShoeData, setBasketShoeData] = useState(getBasketShoeData());
  const navigation = useNavigation();

  const numberItems = basketShoeData.length;
  const subtotal = basketShoeData.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bag</Text>
      </View>

      <FlatList
        style={styles.flatList}
        data={basketShoeData}
        renderItem={({ item }) => (
          <ListItem
            shoeName={item.name}
            imageLink={item.image_url}
            price={item.price}
            description={item.description}
            category={item.category}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.promoSection}>
        <Text style={styles.promoText}>Have a Promo Code?</Text>
        <Ionicons style={styles.promoPlus}name="add-outline"></Ionicons>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={styles.subtotalPrice}>£{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryText}>Delivery</Text>
            <Text style={styles.deliveryPrice}>Standard - Free</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>£{subtotal.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ListItem = ({ shoeName, imageLink, price, description }) => {
  return (

    <View style={styles.itemContainer}>
      <View style={styles.imageAndDetailsContainer}>
        <Image style={styles.itemImage} source={{ uri: imageLink }} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{shoeName}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
      </View>
      <View style={styles.itemPriceContainer}>
        <Text style={styles.Qty}>Qty:  1</Text>
          <Text style={styles.itemPrice}>£{price.toFixed(2)}</Text>
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 90,
    marginLeft: 20,
    marginBottom: 10,
  },
  profileButton: {
    padding: 10,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
  },
  imageAndDetailsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 5,
  },
  itemCategory: {
    fontSize: 16,
    color: 'gray',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  itemSize: {
    fontSize: 14,
    color: 'gray',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    justifyContent : 'space-between'
  },
  Qty: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
    backgroundColor: 'white',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'white',
    marginRight: 15,
  },



  promoSection: {
    flexDirection: 'row',
    justifyContent : 'space-between',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  promoText: {
    marginLeft: 15,
    fontSize: 16,
    marginVertical: 26,
  },
  promoPlus: {
    marginRight: 15,
    fontSize: 25,
    marginVertical: 23,
  },













  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },


  priceContainer: {
    backgroundColor: 'white',
    marginBottom: 15,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  subtotalText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  subtotalPrice: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  deliveryText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  deliveryPrice: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '500',
  },








  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

