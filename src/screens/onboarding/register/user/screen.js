import axios from 'axios'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AppleSocialLoginButton, GoogleSocialLoginButton, InputText, Line, OnboardingButton } from '../../../../components'
import { setUserInfo } from '../../../../store/user'
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/constants/Theme'
import { BASE_URL } from '../../../../utils/core/axios'


export const UserSingUpScreen = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onPressUserSignUp = async () => {
    try{
      const response = await axios.post(`${BASE_URL}/auth/register`, {name, username, email, password })
      console.log(response.data)
      if(response) {
        dispatch(setUserInfo(response.data))
      }
    } catch(e){
      console.error({e})
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Create your account</Text>
      <InputText value={name} label={'Name'} onChangeText={setName}/>
      <InputText value={username} label={'Username'} onChangeText={setUsername}/>
      <InputText value={email} label={'Email'} onChangeText={setEmail}/>
      <InputText value={password} label={'Password'} onChangeText={setPassword}/>
      <Text style={styles.passwordReq}>The password has to contain at least: {'\n'}-8 characters{'\n'}-1 numeber </Text>
      <OnboardingButton title={'Register'} onPress={onPressUserSignUp}/>
      <View style={styles.containerLine}> 
        <Line/>
          <Text style={styles.orLoginUsing}>Or Register Using</Text>
        <Line/>
      </View>
      <View style={styles.socialLoginContainer}>
        <AppleSocialLoginButton/>
        <GoogleSocialLoginButton/>
      </View>
      <TouchableOpacity>
        <Text style={styles.privacyText}>Privacy & Terms</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
  },

  title: {
    fontFamily: 'InterBold',
    fontSize: SIZES.xl, 
    alignSelf: 'center',
    marginTop: HEIGHT_DEVICE / 70,
    marginBottom: HEIGHT_DEVICE / 40,
  }, 
  
  textInput: {
    height: HEIGHT_DEVICE / 16,
    marginTop: HEIGHT_DEVICE / 100, 
    borderRadius: SIZES.md, 
    borderWidth: 0.5,
    borderColor: COLORS.lightGray,
    paddingHorizontal: WIDTH_DEVICE / 20,
  }, 

  emailText: {
    marginTop: HEIGHT_DEVICE / 100,
    fontFamily: 'InterSemiBold', 
    fontSize: SIZES.sm, 
    color: COLORS.darkGray
  }, 
  
  passwordReq: {
    fontFamily: 'InterSemiBold',
    fontSize: SIZES.sm, 
    color: COLORS.darkGray,
    marginTop: HEIGHT_DEVICE / 80
  },

  orLoginUsing: {
    alignSelf: 'center', 
    alignItems: 'center',
    color: COLORS.darkGray, 
    fontFamily: 'InterRegular',
    fontSize: SIZES.sm, 
    marginHorizontal: WIDTH_DEVICE / 20
  }, 

  containerLine: {
    justifyContent: 'space-between',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: HEIGHT_DEVICE / 40,
  }, 

  socialLoginContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: HEIGHT_DEVICE / 40
  }, 

  privacyText: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontFamily: 'InterMedium',
    color: COLORS.primary,
    fontSize: SIZES.md, 
    textAlign: 'center', 
    marginTop: HEIGHT_DEVICE / 8,
  }
})

