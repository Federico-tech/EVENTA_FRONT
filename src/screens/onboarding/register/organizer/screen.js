import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppleSocialLoginButton, GoogleSocialLoginButton, InputText, Line, OnboardingButton } from '../../../../components'
import { COLORS, HEIGHT_DEVICE, SIZES, WIDTH_DEVICE } from '../../../../utils/constants/Theme'

export const OrganiserSignUpScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Become an organiser!</Text>
      <InputText value={username} setValue={setUsername} label={'Username'} />
      <InputText value={email} onChangeText={setEmail} label={'Email'} />
      <InputText value={adress} onChangeText={setAdress} label={'Adress'} />
      <InputText value={password} onChangeText={setPassword} label={'Password'} />
      <Text style={styles.passwordReq}>The password has to contain at least: {'\n'}-8 characters{'\n'}-1 number </Text>
      <OnboardingButton title={'Register'}/>
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

