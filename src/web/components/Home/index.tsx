import * as React from 'react';
import './home.css';
import { NavLink, Link } from 'react-router-dom';
import HeaderBlock from '@components/Headerblock';
const Home = () => {
  return (
    <div className="components-home">
      <div>
        <NavLink to="/AboutUs">关于我们</NavLink>
      </div>
      <h2 data-testid="js-h2">京程一灯</h2>
      <ul data-testid="js-ul">
        <li>JavaScript</li>
        <li>CSS</li>
      </ul>
    </div>
  );
};
export default Home;
