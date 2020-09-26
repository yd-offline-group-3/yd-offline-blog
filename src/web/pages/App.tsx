import React from 'react';
import routes from '@routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRootData } from 'web/tools/useRootData';
import CreateStoreProvider, { storeContext } from '@tools/StoreProvider';
import { createStore } from '@models/root.store';
import HeaderBlock from '@components/Headerblock';
import Footer from '@components/Footer';
const App = () => {
  const token = useRootData((store) => store.home.token);
  const StoreProvider = CreateStoreProvider(createStore, storeContext);
  return (
    <StoreProvider>
      <HeaderBlock></HeaderBlock>
      <Router basename="/">{routes(token)}</Router>
      <Footer></Footer>
    </StoreProvider>
  );
};
export default App;
