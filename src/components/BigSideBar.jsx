import NavLinks from './Navlinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useSelector } from 'react-redux';

const BigSidebar=()=>{
    const {isSidebarOpen}=useSelector(store=>store.user);
    return <Wrapper>
    <div className={isSidebarOpen?'sidebar-container ':'sidebar-container show-sidebar'}>  {/* By default, it will remain open (as isSidebarOpen is false) */}
        <div className="content">
            <header>
                <Logo/>
            </header>
            <NavLinks/>
        </div>
    </div>
    </Wrapper>
}

export default BigSidebar;