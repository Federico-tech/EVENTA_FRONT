import { View, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Container, Header } from '../../../../components'
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { SIZE } from '../../../../utils/theme';

export const PostCommentScreen = () => {
  const [text, setText] = useState('');
  const textInputRef = useRef(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  
  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const handleKeyboardDidShow = (event) => {
    const keyboardHeight = SIZE * 8;
    setKeyboardOffset(keyboardHeight);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOffset(0);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      Keyboard?.removeListener('keyboardDidShow', handleKeyboardDidShow);
      Keyboard?.removeListener('keyboardDidHide', handleKeyboardDidHide);
    };
  }, []);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        style: { marginBottom: keyboardOffset },
      });
    }
  }, [keyboardOffset]);


  return (
    <Container>
      <Header title={'Comments'} back/>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16 }}
          ref={textInputRef}
          onChangeText={handleInputChange}
          
          value={text}
          placeholder="Enter your text here"
        />
      </View>
    </KeyboardAvoidingView>
    </Container>
  )
}