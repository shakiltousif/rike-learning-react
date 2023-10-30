import Header from './layouts/Header.jsx';
import { Outlet } from 'react-router-dom';


function Main() {

  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default Main