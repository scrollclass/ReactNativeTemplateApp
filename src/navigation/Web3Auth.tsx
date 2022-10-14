

const unloggedInView = () => {

    const login = async () => {
        try {
          setConsole("Logging in");
          const web3auth = new Web3Auth(WebBrowser, {
            clientId,
            network: OPENLOGIN_NETWORK.TESTNET, // or other networks
          });
          const info = await web3auth.login({
            loginProvider: LOGIN_PROVIDER.GOOGLE,
            redirectUrl: resolvedRedirectUrl,
            mfaLevel: "none",
            curve: "secp256k1",
          });
    
          setUserInfo(info);
          setKey(info.privKey);
          uiConsole("Logged In");
        } catch (e) {
          uiConsole(e);
        }
      };

    return (
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Button title="Login with Web3Auth" onPress={login} style={styles.button} />
      </View>
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
  

  export default unloggedInView