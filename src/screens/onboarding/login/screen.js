import React, { useState } from 'react'
import { Image, StyleSheet, View, Text} from 'react-native'
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, COLORS, FONTS } from '../../../utils/constants/Theme'

import { TextButton, LineLogin, AppleSocialLoginButton, GoogleSocialLoginButton, InputText, OnboardingButton} from '../../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import base64 from "base-64";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../../store/user'

export const LoginScreen = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('federico.lentini1410@gmail.com')
  const [password, setPassword] = useState('fede1410')

  const onPressLogin = async () => {
    try {
      const auth = base64.encode(`${email.toLowerCase()}:${password}`);
      console.log({auth})
      const { data } =  await axios.post(`auth/login`, undefined, {
        headers: {
          authorization: `Basic ${auth}`,
        }
      })
      console.debug({data})
      dispatch(setUserInfo(data))
    } catch (e) {
      console.log({e})
    }
  }

  return (
    <View>
      <Image source={require('../../../assets/logos/BlueLogo.png')} style={styles.logo}/>
      <View style={styles.container}>
        <Text style={styles.textLogin}>Login to your account</Text>
        <InputText label={'Email'} value={email} setValue={setEmail} autoCapitalize={'none'} />
        <InputText label={'Password'} value={password} setValue={setPassword} autoCapitalize={'none'}/>
        <TextButton text={'Forgot Password?'} textStyle={styles.forgotPassword}/>
        <OnboardingButton title={'Login'} onPress={onPressLogin}/>
        <View style={styles.containerLine}>
          <LineLogin/>
          <Text style={styles.orLoginUsing}>Or Login Using</Text>
          <LineLogin/>
        </View>
        <View style={styles.socialLoginContainer}>
         <AppleSocialLoginButton/>
         <GoogleSocialLoginButton/>
        </View>
        <View style={styles.registerContainer}>
          <View style={styles.registerTextContainer}>
            <Text style={styles.registerText}>You don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserSignUpScreen')}>
              <TextButton text={' SignUp'} textStyle={styles.registerButtonText} />
            </TouchableOpacity>
          </View>
          <View style={styles.registerTextContainer}>
            <Text style={styles.registerText}>Do you want to become an organiser? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrganiserSignUpScreen')}>
              <TextButton text={' Click Here'} textStyle={styles.registerButtonText}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <TextButton text={'Privacy & Terms'} textStyle={styles.privacyText}/>
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
      fontFamily: FONTS.medium,
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

    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: HEIGHT_DEVICE / 50,
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
      color: COLORS.primary
    },
    orLoginUsing: {
      alignSelf: 'center',
      alignItems: 'center',
      color: COLORS.darkGray,
      fontFamily: FONTS.regular,
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
      fontFamily: FONTS.regular,
      fontSize: SIZES.sm,
    },

    registerButtonText: {
      fontFamily: FONTS.medium,
      fontSize: SIZES.sm,
      color: COLORS.primary
    },

    privacyText: {
        alignSelf: 'center',
        marginTop: HEIGHT_DEVICE / 30,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
        fontSize: SIZES.md
    }
})

