import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import store from './redux/store';
import AppRouter from './router';

import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    window.onerror = (
      _event: Event | string,
      _source?: string,
      _lineno?: number,
      _colno?: number,
      error?: Error
    ): any => {
      console.log(error);
    };
  }, []);

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
