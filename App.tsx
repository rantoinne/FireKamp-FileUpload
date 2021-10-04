import React from 'react';
import Home from './src/screens/Home';

import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import configureStore from './src/configureStore';

const { store } = configureStore();

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
