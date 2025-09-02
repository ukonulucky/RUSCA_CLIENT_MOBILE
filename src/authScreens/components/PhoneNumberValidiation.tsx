import React, { useState, useRef, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text
} from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { phoneNumberValidPropTypes } from '../../../../utils/types'

const PhoneNumberValidiation = ({
  setFormattedValue,
  setIsPhoneNumberValid,
  phoneValue,
  setForm,
  form,
  onChange,
  setPhoneValue
}: phoneNumberValidPropTypes) => {
  const [couuntryCode, setcouuntryCode] = useState(null)

  const phoneInput = useRef<PhoneInput>(null)

  useEffect(() => {}, [])

  return (
    <SafeAreaView>
      <PhoneInput
        ref={phoneInput}
        defaultValue={'GB'}
        defaultCode="GB"
        layout="first"
        value={phoneValue}
        withDarkTheme
        onChangeText={(text) => {}}
        onChangeFormattedText={(text) => {
          const countryCode = phoneInput.current?.getCallingCode()
          console.log('this is the code ', countryCode)
          setPhoneValue(text)
          const checkValid = phoneInput.current?.isValidNumber(text)
          console.log('check validaity', checkValid, text, text.length)
          if (countryCode === '44') {
            /* validiting only for nigeria numbers */
            setIsPhoneNumberValid(
              checkValid && text.length === 14 ? checkValid : false
            )
          } else {
            setIsPhoneNumberValid(checkValid ? checkValid : false)
          }

          console.log('ran here', text)

          setFormattedValue(text)
          setForm({
            ...form,
            phoneNumber: text
          })
          onChange(text)
        }}
        textContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          borderRightColor: 'white'
        }}
        containerStyle={{
          backgroundColor: 'white',
          width: '100%',
          height: 65,
          borderRadius: 19,
          borderWidth: 1,
          borderColor: '#E8E7EA',
          alignItems: 'center',
          paddingLeft: 2,
          overflow: 'hidden'
        }}
        codeTextStyle={{
          color: '#565560',
          fontFamily: 'Aeonik-Medium',
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: 20,
          letterSpacing: -0.56
        }}
        countryPickerButtonStyle={{
          borderRadius: 19,
          backgroundColor: '#F8F8F8',
          padding: 10,
          height: 60
        }}
      />
    </SafeAreaView>
  )
}

export default PhoneNumberValidiation
