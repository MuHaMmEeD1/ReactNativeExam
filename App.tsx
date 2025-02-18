import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import "./global.css"
import { View, Text } from 'react-native'

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>Homepage</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App