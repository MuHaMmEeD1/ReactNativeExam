import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import './global.css';
import {View, Text} from 'react-native';
import Navigation from './src/stacks/Navigation';

const App = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: '#000000', flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
