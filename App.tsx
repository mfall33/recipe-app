import React from 'react';
import { SafeAreaView, StyleSheet, LogBox } from 'react-native';
import { persistor, store } from './src/Redux/Store';
import { Provider } from 'react-redux';
import RootNav from './src/Navigation';
import Toast from 'react-native-toast-message';
import { TURQOISE, TURQOISE_OP } from './src/Constants/Colors';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  // comment this out when testing..
  LogBox.ignoreAllLogs()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.base}>
          <RootNav />
          <Toast
            position="bottom"
            visibilityTime={3000}
          />
        </SafeAreaView>
      </PersistGate>
    </Provider >
  );

}

const styles = StyleSheet.create({
  base: {
    height: '100%',
    backgroundColor: TURQOISE_OP
  }
})

export default App;