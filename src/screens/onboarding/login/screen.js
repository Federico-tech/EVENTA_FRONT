import React, { useState } from 'react'
import { Image, StyleSheet, View, Text, TextInput } from 'react-native'
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, COLORS } from '../../../utils/constants/Theme'

import { LoginButton, Line, AppleSocialLoginButton, GoogleSocialLoginButton } from '../../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {

  const navigation = useNavigation() 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View>
      <Image source={require('../../../assets/logos/BlueLogo.png')} style={styles.logo}/>
      <View style={styles.container}>
        <Text style={styles.textLogin}>Login to your account</Text>
        <Text style={styles.emailText}>Email</Text>
        <TextInput style={styles.textInput} value={email} onChangeText={(text) => setEmail(text)}/>
        <Text style={styles.emailText}>Password</Text>
        <TextInput style={styles.textInput} value={password} onChangeText={(text) => setPassword(text)}/>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <LoginButton/>
        <View style={styles.containerLine}> 
          <Line/>
          <Text style={styles.orLoginUsing}>Or Login Using</Text>
          <Line/>
        </View>
        <View style={styles.socialLoginContainer}>
         <AppleSocialLoginButton/>
         <GoogleSocialLoginButton/>
        </View>
        <View style={styles.registerContainer}>
          <View style={styles.registerTextContainer}> 
            <Text style={styles.registerText}>You don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserSignUpScreen')}>
              <Text style={styles.registerButtonText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerTextContainer}> 
            <Text style={styles.registerText}>Do you want to become an organiser? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrganiserSignUpScreen')}>
              <Text style={styles.registerButtonText}> Click here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.privacyText}> Privacy & Terms </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginHorizontal: WIDTH_DEVICE / 20
    },
  
    logo: {
      alignSelf: 'center',
      marginTop: HEIGHT_DEVICE / 18
    }, 

    textLogin: {
      alignSelf: 'center',
      marginTop: HEIGHT_DEVICE / 35, 
      fontFamily: 'Inter-Medium', 
      fontSize: SIZES.md
    },

    textInput: {
      height: HEIGHT_DEVICE / 16,
      marginTop: HEIGHT_DEVICE / 140, 
      borderRadius: SIZES.md, 
      borderWidth: 0.5,
      borderColor: COLORS.lightGray,
      paddingHorizontal: WIDTH_DEVICE / 20,
    }, 
    emailText: {
      marginTop: HEIGHT_DEVICE / 100,
      fontFamily: 'Inter-SemiBold', 
      fontSize: SIZES.sm, 
      color: COLORS.darkGray
    }, 
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: HEIGHT_DEVICE / 50,
      fontFamily: 'Inter-Regular', 
      fontSize: SIZES.sm, 
      color: COLORS.primary
    }, 
    orLoginUsing: {
      alignSelf: 'center', 
      alignItems: 'center',
      color: COLORS.darkGray, 
      fontFamily: 'Inter-Regular',
      fontSize: 12, 
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

    appleLogo: {
      width: WIDTH_DEVICE / 20, 
      height: HEIGHT_DEVICE /20
    }, 

    registerContainer: {
      marginTop: HEIGHT_DEVICE / 40
    }, 

    registerTextContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginBottom: HEIGHT_DEVICE / 80
    }, 

    registerText: {
      fontFamily: 'Inter-Regular',
      fontSize: SIZES.sm, 
    }, 

    registerButtonText: {
      fontFamily: 'Inter-Bold',
      fontSize: SIZES.sm, 
      color: COLORS.primary
    }, 

    privacyText: {
        alignSelf: 'center',
        marginTop: HEIGHT_DEVICE / 30, 
        fontFamily: 'Inter-Medium',
        color: COLORS.primary, 
        fontSize: SIZES.md
    }
})

