import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppleSocialLoginButton, GoogleSocialLoginButton, InputText, LineLogin, OnboardingButton, TextButton } from '../../../../components'
import { COLORS, FONTS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/constants/Theme'
import axios from 'axios'
import { useDispatch } from 'react-redux' 
import { setUserInfo } from '../../../../store/user'

export const OrganiserSignUpScreen = () => {
  const [username, setUsername] = useState('Coco')
  const [email, setEmail] = useState('Coco@gmail.com')
  const [adress, setAdress] = useState('Via Coco')
  const [password, setPassword] = useState('Coco')
  const role = 'organiser'
  const dispatch = useDispatch()

  const OnPressOrganiserSignUp = async () => {
    try{
      const response = await axios.post(`/auth/register`, {username, email, adress, password, role})
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
      <Text style={styles.title}>Become an organiser!</Text>
      <InputText value={username} setValue={setUsername} label={'Username'} />
      <InputText value={email} onChangeText={setEmail} label={'Email'} />
      <InputText value={adress} onChangeText={setAdress} label={'Adress'} />
      <InputText value={password} onChangeText={setPassword} label={'Password'} />
      <Text style={styles.passwordReq}>The password has to contain at least: {'\n'}-8 characters{'\n'}-1 number </Text>
      <OnboardingButton title={'Register'} onPress={OnPressOrganiserSignUp}/>
      <View style={styles.containerLine}>
        <LineLogin/>
          <Text style={styles.orLoginUsing}>Or Register Using</Text>
        <LineLogin/>
      </View>
      <View style={styles.socialLoginContainer}>
        <AppleSocialLoginButton/>
        <GoogleSocialLoginButton/>
      </View>
      <TouchableOpacity>
        <TextButton text={'Privacy & Terms'} textStyle={styles.privacyText}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH_DEVICE / 20,
  },

  title: {
    fontFamily: FONTS.semiBold,
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
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray
  },

  passwordReq: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.sm,
    color: COLORS.darkGray,
    marginTop: HEIGHT_DEVICE / 80
  },

  orLoginUsing: {
    alignSelf: 'center',
    alignItems: 'center',
    color: COLORS.darkGray,
    fontFamily: FONTS.regular,
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
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: SIZES.md, 
    textAlign: 'center', 
    marginTop: HEIGHT_DEVICE / 8,
  }
})

