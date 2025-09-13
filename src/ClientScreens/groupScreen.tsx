import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupScreen() {
    const navigation = useNavigation()
  return (
    <View className="flex-1 bg-white">
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/join-group.jpeg')} 
        className="flex-1 justify-center items-center"
      >
        <View className="flex-1 justify-center relative items-center px-5  w-full">
          <View className="bg-blue-200 rounded-full p-10 mb-10">
            <Text className="text-4xl text-blue-600">👥</Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            className="bg-blue-600 py-4 px-10 rounded-full mb-4 w-full absolute bottom-0"
            onPress={() => navigation.navigate('GroupDetails')} 
          >
            <Text className="text-white text-lg font-bold text-center">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
