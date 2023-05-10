import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { store } from './src/Redux/Store';
import { Provider } from 'react-redux';
import RootNav from './src/Navigation';
import Toast from 'react-native-toast-message';
import { TURQOISE } from './src/Constants/Colors';
import setupInterceptors from "./src/Services/setupInterceptors";


function App() {


  return (
    <Provider store={store}>
      <SafeAreaView style={styles.base}>
        <RootNav />
        <Toast
          position="bottom"
          visibilityTime={3000}
        />
      </SafeAreaView>
    </Provider>
  );

}

const styles = StyleSheet.create({
  base: {
    height: '100%',
    backgroundColor: TURQOISE
  }
})

export default App;