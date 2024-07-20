import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Linking, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function ContactScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Default' component={DefaultContactScreen} options={{headerShown:false, presentation:'containedModal'}}/>
      <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown:false, presentation:'containedModal'}}/>
    </Stack.Navigator>
  );
}

function DefaultContactScreen() {
  const navigation = useNavigation();
  const [ nameTyped, setNameTyped ] = useState('');
  const [ subjectTyped, setSubjectTyped ] = useState('');
  const [ messageTyped, setMessageTyped ] = useState('');

  var Name = nameTyped;
  var Subject = subjectTyped.toString();
  var Message = messageTyped;
  const url = 'mailto:s5430870@bournemouth.ac.uk';

  return (
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
            <TouchableOpacity>
                <Text style={styles.activeTabText}>CONTACT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Basket')}}>
                <Text style={styles.tabText}>BASKET</Text>
            </TouchableOpacity>
            </View>

     

            <View style={{flexDirection:'row'}}>

              <View>
                <Text style={{marginTop:45, marginLeft:20, fontWeight:'bold'}}>Name</Text>
                <Text style={{marginTop:22, marginLeft:20, fontWeight:'bold'}}>Subject</Text>
                <Text style={{marginTop:22, marginLeft:20, fontWeight:'bold'}}>Message</Text>
              </View>

              <View>

              <View style={styles.nameInput}>
                  <TextInput 
                  style={styles.name}
                  placeholder='Enter name...'
                  value={nameTyped}
                  onChangeText={setNameTyped}
                  />
              </View>

              <View style={styles.subject}>
                  <TextInput 
                  style={styles.name}
                  placeholder='Enter subject...'
                  value={subjectTyped}
                  onChangeText={setSubjectTyped}
                  />
              </View>

             
              <View style={styles.messageInput}>
                  <TextInput 
                  style={styles.name}
                  placeholder='Enter message...'
                  multiline={true}
                  value={messageTyped}
                  onChangeText={setMessageTyped}
                  />
              </View>
              

              </View>

            </View>

            <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(encodeURI(url))}>
              <Text style={{color:'white', fontWeight:'bold', letterSpacing:0.7}}>Send</Text>
            </TouchableOpacity>

            <View style={{marginTop:45}}>
              <View>
                <Text style={{textAlign:'center', margin:15, opacity:0.4, fontSize:10}}>By submitting the above data, you agree to the collection and use of information in accordance with our Privacy Policy. Your personal data will be used to contact you via email, telephone call or SMS regarding informative communications in line with your enquiry. </Text>
              </View>
              <TouchableOpacity style={styles.privacyButton} onPress={() => Linking.openURL('https://www.privacypolicies.com/live/e511ea96-8631-4954-9955-d8f9c595343c')}>
                <Text style={{textDecorationLine:'underline', color:'blue', fontSize:10}}>View our full privacy policy here</Text>
              </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:70}}>
            <TouchableOpacity style={styles.roundButton} onPress={() => Linking.openURL('mailto:s5430870@bournemouth.ac.uk')}>
              <Ionicons name='mail' color='white' size={30}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.roundButton} onPress={() => Linking.openURL('https://linkedin.com/in/maggie-foulds')}>
            <Ionicons name='logo-linkedin' color='white' size={30}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.roundButton} onPress={() => Linking.openURL('https://bournemouth.ac.uk')}>
            <Ionicons name='link' color='white' size={30}/>
            </TouchableOpacity>
            </View>

        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex:0.15,
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
  contactButton: {
    backgroundColor:'#0060c6',
    width:200,
    borderRadius:20,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:50,
    shadowColor:'black',
    shadowRadius:10,
    shadowOpacity:0.3
  },
  name: {
    fontSize:14,
    marginLeft:10,
    width:'90%',
  },
  nameInput: {
    padding:5,
    flexDirection:'row',
    width:'80%',
    backgroundColor:'#d9dbda',
    borderRadius:20,
    marginTop:40,
    marginLeft:20,
    height:29
  },
  messageInput: {
    padding:5,
    flexDirection:'row',
    width:'80%',
    backgroundColor:'#d9dbda',
    borderRadius:20,
    marginTop:10,
    marginLeft:20,
    height:200
  },
  subject: {
    padding:5,
    flexDirection:'row',
    width:'80%',
    backgroundColor:'#d9dbda',
    borderRadius:20,
    marginTop:10,
    height:29,
    marginLeft:20
  },
  roundButton: {
    width:60,
    height:60,
    borderRadius:40,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'black',
    shadowRadius:10,
    shadowOpacity:0.4
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
  },
  privacyButton: {
    marginTop:0,
    alignSelf:'center',
    opacity:0.6
  }
});