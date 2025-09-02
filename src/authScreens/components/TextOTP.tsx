import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { textOTPPropTypes } from '../../../../utils/types'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'

import { Octicons } from '@expo/vector-icons'

const TextOTP = ({ otp, setOtp }: textOTPPropTypes) => {
  const CELL_COUNT = 5

  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHnadler] = useClearByFocusCell({
    value,
    setValue
  })

  useEffect(() => {
    const valueArray = value.split('')
    if (valueArray) {
      setOtp(value)
    }
  }, [value])

  return (
    <View className="w-[280px] flex-row justify-center items-center space-x-8 border-solid mx-auto ">
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        rootStyle={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          justifyContent: 'center'
        }}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            className={`
     w-[52px] h-[52px] bg-white rounded-2xl items-center justify-center border text-[25px] border-gray-200 ${
       isFocused && `border-blue-950`
     }
     text-center
     `}
            key={index}
            onLayout={getCellOnLayoutHnadler(index)}
          >
            <Text className="text-center text-neutral-900 text-xl font-medium font-['Aeonik-Regular'] leading-normal">
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

export default TextOTP
