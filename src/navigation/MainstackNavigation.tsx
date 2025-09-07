import { Text, View } from "react-native";
import React, { useEffect, useCallback, useState } from "react";

import { loadFont } from "../../utils/fontDownload";
import * as SplashScreen from "expo-splash-screen";
import RootNavigation from "./RootNavigation";

// keep the spalsh screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const MainStackNavigation = () => {
  const [appIsready, setappIsready] = useState(false);


  const [isUserBoarded, setIsUserBoarded] = useState(true);

 

  useEffect(() => {
    async function prepareApp() {
      try {
        // prelaoding fonts
        await loadFont();
        // artificail delay for two seconds to simulate slow loading

        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (e) {
        console.warn(e);
      } finally {
        // tell the app to render
        setappIsready(true);
      }
    }
    prepareApp();
  }, []);

 

  const onLayoutReview = useCallback(async () => {
    if (appIsready) {
      await SplashScreen.hideAsync();
    }
  }, [appIsready]);

  if (!appIsready) {
    return null;
  }

  return (
   
      <View onLayout={onLayoutReview} className="flex-1">
      <RootNavigation />
      </View>
  
  );
};

export default MainStackNavigation;
