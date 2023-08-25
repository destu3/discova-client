import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import Profile from '../profile/profile';
import logo from '../../assets/Discova.png';
import './navbar.component.css';

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <header
      style={{ '--tw-bg-opacity': 0.5 }}
      className="w-full bg-background relative z-50 h-20"
    >
      <nav className="sm:container mx-auto h-full flex items-center justify-between pr-[12px]">
        {/* Logo */}
        <NavLink
          className="flex items-center h-fit"
          to="/"
          title="Discova Home"
        >
          <img src={logo} alt="logo" className="h-12" />
        </NavLink>

        {/* Main Menu */}
        {/* <div className=" hidden md:flex items-center gap-3">
          <ul className="items-center flex gap-6 text-sm">
            <li>
              <NavLink to="/" className="nav-link-text">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/animelist" className="nav-link-text">
                Anime List
              </NavLink>
            </li>
            <li>
              <NavLink to="/themes" className="nav-link-text">
                Themes
              </NavLink>
            </li>
            <li>
              <NavLink to="/characters" className="nav-link-text">
                Characters
              </NavLink>
            </li>
          </ul>
        </div> */}

        {/* Right Menu */}
        <div className="right flex items-center gap-3 text-sm">
          {/* Search Icon */}
          <Link to="search" className="search-icon-wrapper">
            <i className="fa-solid nav-link-text fa-magnifying-glass text-[1.5rem] pr-2" />
          </Link>

          {/* User Authentication */}
          {!currentUser ? (
            <>
              <NavLink className="nav-link-text" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link-text" to="/sign-up">
                Sign Up
              </NavLink>
            </>
          ) : (
            <Profile currentUser={currentUser} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
