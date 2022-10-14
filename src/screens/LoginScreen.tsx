import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Buffer } from "buffer";
import "@ethersproject/shims";
import { ethers } from "ethers";

import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginSVG from '../assets/images/misc/login.svg';
import AppleSVG from '../assets/images/misc/apple.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
// import CoinbaseSVG from '../assets/images/misc/coinbase.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AppContext } from '../context/AppProvider';
import Navigation from '../navigation';
import { set } from 'react-native-reanimated';

global.Buffer = global.Buffer || Buffer;

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

const clientId = "BMr2jGS7NfaPjE-_7akc48mCWevCh9hzH7jC1VDwFQ44yIz0tYcDPgrioFbcYWER4VyKuWbBKKo-i-RFVbz_ubQ";
const providerUrl = "https://rpc.ankr.com/eth"; // Or your desired provider url
      

const LoginScreen = ({ navigation }) => {
  const { currentWalletAddress , setCurrentWalletAddress } = React.useContext(AppContext);
  const [address, setAddress] = useState<string>("");
  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState("");
  
  const Login = async (Provider: string) => {
    try {
      console.log("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: Provider,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "none",
        curve: "secp256k1",
      });
      const ethersProvider = ethers.getDefaultProvider(providerUrl);
      setUserInfo(info);
      setKey(info.privKey)

      const wallet = new ethers.Wallet(key, ethersProvider);
      setAddress(wallet.address)
      console.log("Logged In", address);
      setCurrentWalletAddress(address)
  
      if(!address || !wallet){
        console.log("Error Please Try again");
      }
      
    } catch (e) {
      console.log(e);
    }
  };

  const DefaultLogin = () => {
    console.log('Address was: ', address)
    if (address.length > 40) {
      console.log(`Wallet Entry ${address} was valid, call or create user in DB: `);
      setCurrentWalletAddress(address)
    } else {
      Alert.alert('Invalid Wallet Address', `${address} wasn't long enough`)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <LoginSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: '-5deg' }] }}
          />
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>
        <InputField
          label={'Wallet Address'}
          icon={<Ionicons
            name="wallet"
            size={20}
            color="#666"
            style={{ marginRight: 5 }} />}
          value={address}
          onChangeText={(value: string) => setAddress(value)}
          inputType="wallet"
          // fieldButtonLabel={connector.connected ? "Disconnect" : "Wallet Connect"}
          // fieldButtonFunction={connector.connected ? disconnectWallet : connectWallet}
          keyboardType={undefined} />

        <CustomButton label={"Login"} onPress={() => { DefaultLogin() }} />
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => Login("google")}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() => Login("apple")}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <AppleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Login("facebook")}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() =>  navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
