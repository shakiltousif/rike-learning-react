import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';
import { Outlet } from 'react-router-dom';
import HomeHeader from '../../components/frontend/HomeHeader.jsx';


function Main() {

  return (
    <>
        <HomeHeader />
        <Outlet />
    </>
  )
}

export default Main