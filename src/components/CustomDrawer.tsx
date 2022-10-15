import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppContext } from '../context/AppProvider';

const CustomDrawer = props => {
  const { currentWalletAddress , setCurrentWalletAddress } = React.useContext(AppContext);

  
  const logout = () => {
    console.log("Logging out of ", currentWalletAddress)
    setCurrentWalletAddress("")
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#272838' }}>
        <ImageBackground
          source={{uri:'https://media3.giphy.com/avatars/kenaim/eQgeR40yR0o0.gif'}}
          style={{ padding: 20 }}>
          {true ?
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
            :
            null
          }
          <Text
            style={{
              padding: 3,
              fontWeight: 'bold',
              textShadowColor: '#fff',
              textShadowRadius: 10,
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {true ? 'Hi Person' : 'No username'}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontWeight: 'bold',
                textShadowColor: '#000',
                textShadowRadius: 10,
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
                $ Money
            </Text>
            <FontAwesome5 name="coins" size={14} color="#FFF" />
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 15 }}>
            <Text
              style={{
                fontWeight: 'bold',
                textShadowColor: '#000',
                textShadowRadius: 10,                
                textShadowOffset: {width: 0.7, height: 1},
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
             {currentWalletAddress}
            </Text>
            <FontAwesome5 name="wallet" size={14} color="#FFF" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { return logout() }}
          style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
