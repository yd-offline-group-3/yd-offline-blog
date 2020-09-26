import React from 'react';
import routes,{firstRoute} from '@routes/index';
import RightComponet from "@components/RightComponet"
import { useRootData } from 'web/tools/useRootData';
import HeaderBlock from '@components/Headerblock';
import { storeContext } from '@tools/StoreProvider';
import Footer from '@components/Footer';
import './index.css'
const App = () => {
  const token = useRootData((store) => store.home.token);
  const store = React.useContext(storeContext);
  store.header.setTitle('京程一灯', '专注于国内外大前端前沿技术，分享技术文章、工具资源、前端框架、精选项目。');
  return (
      <>
      {<HeaderBlock></HeaderBlock>}
      <section className='main-conatiner'>
         {routes(firstRoute[0].routes)(token)}
        <RightComponet></RightComponet>
      </section>   
      <Footer></Footer>
      </>
  );
};
export default App;
