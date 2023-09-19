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
      className="w-full bg-background relative z-50 h-[70px]"
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

        {/* Right Menu */}
        <div className="right flex items-center gap-3 text-sm">
          {/* Search Icon */}
          <Link to="search" className="search-icon-wrapper">
            <i className="fa-solid nav-link-text fa-magnifying-glass text-[1.3rem] pr-2 relative top-[2px]" />
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
