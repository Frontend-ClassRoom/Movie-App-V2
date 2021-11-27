import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import App from './components/App';
import store from './store';
import './assets/styles/index.scss';

const persistor = persistStore(store);

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

render(<Root />, document.getElementById('root'));
