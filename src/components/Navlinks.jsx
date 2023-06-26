import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks=({toggleSidebar})=>{
    return <div className="nav-links">{links.map(link=>{
        const {text,path,id,icon}=link;

        return <NavLink to={path} key={id} onClick={toggleSidebar} className='nav-link' end >  {/* Sometimes all the subroutes get the active class, this 'end' attribute will prevent that, refer to the link for details*/}
            <span className='icon'>{icon}</span>{text}
        </NavLink>})}
    </div>
}

export default NavLinks;

// https://stackoverflow.com/questions/70644361/react-router-dom-v6-shows-active-for-index-as-well-as-other-subroutes

