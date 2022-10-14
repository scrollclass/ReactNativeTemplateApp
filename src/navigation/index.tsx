/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Dimensions, ColorSchemeName } from "react-native";

import {
  RootStackParamList,
} from "../types";

import LinkingConfiguration from "./LinkingConfiguration";

import {AppContext} from "../context/AppProvider";
// import { useAuthenticationStatus } from "@nhost/react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { currentWalletAddress , setCurrentWalletAddress } = React.useContext(AppContext);
  // const [userInfo, setUserInfo] = useState("");
  // const [console, setConsole] = useState("");
  // const { isLoading, isAuthenticated } = useAuthenticationStatus();


  // const getChainId = async () => {
  //   try {
  //     setConsole("Getting chain id");
  //     const ethersProvider = ethers.getDefaultProvider(providerUrl);
  //     const networkDetails = await ethersProvider.getNetwork();
  //     uiConsole(networkDetails);
  //   } catch (e) {
  //     uiConsole(e);
  //   }
  // }
  
  // const getAccounts = async () => {
  //   try {
  //     setConsole("Getting account");
  //     const wallet = new ethers.Wallet(key)
  //     const address = await wallet.address;
  //     uiConsole(address);
  //   } catch (e) {
  //     uiConsole(e);
  //   }
  // };
  // const getBalance = async () => {
  //   try {
  //     setConsole("Fetching balance");
  //     const ethersProvider = ethers.getDefaultProvider(providerUrl);
  //     const wallet = new ethers.Wallet(key, ethersProvider);
  //     const balance = await wallet.getBalance();
  //     uiConsole(balance);
  //   } catch (e) {
  //     uiConsole(e);
  //   }
  // };
  // const sendTransaction = async () => {
  //   try {
  //     setConsole("Sending transaction");
  //     const ethersProvider = ethers.getDefaultProvider(providerUrl);
  //     const wallet = new ethers.Wallet(key, ethersProvider);

  //     const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";

  //     // Convert 1 ether to wei
  //     const amount = ethers.utils.parseEther("0.001");

  //     // Submit transaction to the blockchain
  //     const tx = await wallet.sendTransaction({
  //       to: destination,
  //       value: amount,
  //       maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
  //       maxFeePerGas: "6000000000000", // Max fee per gas
  //     });
  //     uiConsole(tx);
  //   } catch (e) {
  //     uiConsole(e);
  //   }
  // };
  // const signMessage = async () => {
  //   try {
  //     setConsole("Signing message");
  //     const ethersProvider = ethers.getDefaultProvider(providerUrl);
  //     const wallet = new ethers.Wallet(key, ethersProvider);

  //     const originalMessage = "YOUR_MESSAGE";

  //     // Sign the message
  //     const signedMessage = await wallet.signMessage(originalMessage);

  //     uiConsole(signedMessage);
  //   } catch (e) {
  //     uiConsole(e);
  //   }
  // };

  // const uiConsole = (...args) => {
  //   setConsole(JSON.stringify(args || {}, null, 2)+ "\n\n\n\n" + console);
  // };

  // const loggedInView = (
  //   <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
  //     <Button title="Get User Info" onPress={() => uiConsole(userInfo)} style={styles.button} />
  //     <Button title="Get Chain ID" onPress={() => getChainId()} style={styles.button} />
  //     <Button title="Get Accounts" onPress={() => getAccounts()} style={styles.button} />
  //     <Button title="Get Balance" onPress={() => getBalance()} style={styles.button} />
  //     <Button title="Send Transaction" onPress={() => sendTransaction()} style={styles.button} />
  //     <Button title="Sign Message" onPress={() => signMessage()} style={styles.button} />
  //     <Button title="Get Private Key" onPress={() => uiConsole(key)} style={styles.button} />
  //     <Button title="Log Out" onPress={() => setKey("")} style={styles.button} />
  //   </View>
  // );
  
  // const unloggedInView = () => {
  //   return (
  //     <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
  //       <Button title="Login with Web3Auth" onPress={login} style={styles.button} />
  //     </View>
  //   );
  // } 

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  return (
    <Stack.Navigator>
      {!currentWalletAddress ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="App"
          component={AppStack}
        />
      )}
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    padding: 5
  },
  consoleArea: {
    margin: 20, 
    alignItems: "center", 
    justifyContent: "center", 
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    color: "#ffffff",
    padding: 10,
    width: Dimensions.get('window').width - 60,
  }
});
