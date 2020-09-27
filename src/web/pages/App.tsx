import React, { useEffect } from 'react';
import routes from '@routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRootData } from 'web/tools/useRootData';
import CreateStoreProvider, { storeContext } from '@tools/StoreProvider';
import { createStore } from '@models/root.store';
import HeaderBlock from '@components/Headerblock';
import Footer from '@components/Footer';
const App = () => {
  localStorage.setItem("token", "Smith");
  const token = useRootData((store) => store.home.token);
  const StoreProvider = CreateStoreProvider(createStore, storeContext);
  return (
    <StoreProvider>
      <HeaderBlock></HeaderBlock>
      <Router>{routes()(token)}</Router>
      <Footer></Footer>
    </StoreProvider>
  );
};
export default App;
