import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '64px' }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
