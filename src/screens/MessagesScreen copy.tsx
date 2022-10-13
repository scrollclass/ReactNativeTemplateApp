import React from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, View, Button } from "react-native";
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from 'styled-components';
import tw from 'twrnc';

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #FFF;
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: 20%
`

export const MessageScreen = () => {

  return (
    <ScrollView style={[tw`bg-black`]}>
      <Container style={[tw`bg-black`]}>
        <Header> Messages Screen </Header>
        <SafeAreaView style={tw`flex-1`}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`'flex-1`}
            keyboardVeritcalOffset={10}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   
            </TouchableWithoutFeedback>
            <View style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}>
              <TextInput
                style={tw`h-10 text-lg`}
                placeholder="Send a Message..."
              // onChangeText={setInput}
              // onSubmitEditing={sendMessage}
              // value={input}
              />
              {/* <Button title="Send" color="#FF5864" onPress={sendMessage} /> */}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Container>
    </ScrollView>
  );
}

export default MessageScreen;