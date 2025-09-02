import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { OnBoardingButtonPropType } from "../../utils/types"

export const OnBoardingButton = ({
    buttonTextStyle,
    buttonContainerStyles,
    buttonText,
    onPress,
    disabled = false
  }: OnBoardingButtonPropType) => {
    return (
      <TouchableOpacity
        disabled={ disabled }
        activeOpacity={0.7}
        className={buttonContainerStyles}
        onPress={onPress}
      >
        <Text className={buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }
  