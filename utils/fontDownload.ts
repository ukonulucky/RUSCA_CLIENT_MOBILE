import  * as Font from "expo-font"


export const loadFont = async() => {
    await Font.loadAsync({
        "Aeonik" : require("../assets/fonts/Aeonik-font/Aeonik-Air.otf"),
        "Aeonik-AirItalic" : require("../assets/fonts/Aeonik-font/Aeonik-AirItalic.otf"),
        "Aeonik-Black" : require("../assets/fonts/Aeonik-font/Aeonik-Black.otf"),
        "Aeonik-BlackItalic" : require("../assets/fonts/Aeonik-font/Aeonik-BlackItalic.otf"),
        "Aeonik-Light" : require("../assets/fonts/Aeonik-font/Aeonik-Light.otf"),
        "Aeonik-LightItalic" : require("../assets/fonts/Aeonik-font/Aeonik-LightItalic.otf"),
        "Aeonik-Medium" : require("../assets/fonts/Aeonik-font/Aeonik-Medium.otf"),
        "Aeonik-MediumItalic" : require("../assets/fonts/Aeonik-font/Aeonik-MediumItalic.otf"),
        "Aeonik-Regular" : require("../assets/fonts/Aeonik-font/Aeonik-Regular.otf"),
        "Aeonik-RegularItalic" : require("../assets/fonts/Aeonik-font/Aeonik-RegularItalic.otf"),
        "Aeonik-Thin" : require("../assets/fonts/Aeonik-font/Aeonik-Thin.otf"),
        "Aeonik-ThinItalic" : require("../assets/fonts/Aeonik-font/Aeonik-ThinItalic.otf")
    })
}