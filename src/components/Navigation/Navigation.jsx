import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation = () => (
  <nav>
    <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
      Home
    </NavLink>
    <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
      Movies
    </NavLink>
    {/* <NavLink to="/film" className={s.link} activeClassName={s.activeLink}>
      Film
    </NavLink> */}
  </nav>
);
export default Navigation;
