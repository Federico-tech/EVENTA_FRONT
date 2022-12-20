import React, { useState } from 'react'
import { Image, StyleSheet, View, Text} from 'react-native'
import { WIDTH_DEVICE, HEIGHT_DEVICE, SIZES, COLORS } from '../../../utils/constants/Theme'

import {LoginButton, Line, AppleSocialLoginButton, GoogleSocialLoginButton, InputText} from '../../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import {TextButton} from "../../../components/TextButton";
import base64 from "base-64";
import {noAuthAxios} from "../../../utils/core/axios";
import axios from "axios";

export const LoginScreen = () => {

  const navigation = useNavigation()

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
        <LoginButton text={'Login'} onPress={onPressLogin}/>
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
      fontFamily: 'InterMedium',
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
      fontFamily: 'InterSemiBold',
      fontSize: SIZES.sm,
      color: COLORS.darkGray
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: HEIGHT_DEVICE / 50,
      fontFamily: 'InterRegular',
      fontSize: SIZES.sm,
      color: COLORS.primary
    },
    orLoginUsing: {
      alignSelf: 'center',
      alignItems: 'center',
      color: COLORS.darkGray,
      fontFamily: 'InterRegular',
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
      fontFamily: 'InterRegular',
      fontSize: SIZES.sm,
    },

    registerButtonText: {
      fontFamily: 'InterMedium',
      fontSize: SIZES.sm,
      color: COLORS.primary
    },

    privacyText: {
        alignSelf: 'center',
        marginTop: HEIGHT_DEVICE / 30,
        fontFamily: 'InterMedium',
        color: COLORS.primary,
        fontSize: SIZES.md
    }
})

