import Header from './header';
import { Outlet } from 'react-router-dom';

function Layout(){
    return  <>
                <Header/>
                <div className="my-2 p-4"/>
                <Outlet/>
            </>;
}

export default Layout;