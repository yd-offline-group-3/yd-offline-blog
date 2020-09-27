import React,{useEffect} from 'react';
import routes from '@routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRootData } from 'web/tools/useRootData';
import CreateStoreProvider, { storeContext } from '@tools/StoreProvider';
import { createStore } from '@models/root.store';
const App = () => {
  localStorage.setItem("token", "Smith");
  const token = useRootData((store) => store.home.token);
  const StoreProvider = CreateStoreProvider(createStore, storeContext);
  return (
    <StoreProvider>
      <Router>{routes()(token)}</Router>
    </StoreProvider>
  );
};
export default App;
