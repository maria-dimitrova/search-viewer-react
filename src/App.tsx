import React from 'react';
import './App.css';
import TabNavigation from './components/Tabs/TabNavigation';
import loadClient from './GapiClient';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/main-reducer';

gapi.load("client", () => { loadClient() });

const initialState = {
  tabs: [] as any,
  activeTab: { 
    name: "",
    id: "0",
    searchProperties: { query: "", type: null },
    searchResult: [] as any
  },
  executeSearch: (event?: string) => {}
};

export const store = createStore(reducer, initialState);

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <TabNavigation/>
      </Provider>
  );
}

export default App;