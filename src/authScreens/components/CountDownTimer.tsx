import React from 'react'
import { countDownTimeType } from '../../../utils/types'


const CountDownTimer = ({
  setResumeCounter,
  resumeCounter,
  counterTime,
  
}: countDownTimeType) => {
  /* set default types for the library  */
  const CountDown = require('react-native-countdown-fixed').default

  return (
    <CountDown
      timeToShow={['M', 'S']}
      timeLabels={{
        m: '',
        s: ''
      }}
      until={counterTime}
      onFinish={() => {
        setResumeCounter(!resumeCounter)
      
      }}
      size={20}
      digitStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        width: 20
      }}
      digitTxtStyle={{
        color: ' rgb(82, 82, 91)',
        fontSize: 12
      }}
      showSeparator={true}
      separatorStyle={{
        color: 'gray',
        fontSize: 12,
        paddingHorizontal: 0,
        marginHorizontal: 0
      }}
    />
  )
}

export default CountDownTimer
