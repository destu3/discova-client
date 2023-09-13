import { useContext, useState, useRef, useEffect } from 'react';
import { redirectHome, logout } from '../../utils/common';
import { showAlert } from '../../utils/alert-utils';
import { AlertContext } from '../../contexts/alert.context';

const Profile = ({ currentUser }) => {
  const { setAlert } = useContext(AlertContext);
  const [actionsVisible, setActionsVisible] = useState(false);
  const actionsRef = useRef(null);

  const logUserOut = () => {
    logout();
    showAlert('You have been logged out', setAlert);
    redirectHome(2500);
  };

  const showActions = () => {
    setActionsVisible(true);
  };

  const hideActions = () => {
    setActionsVisible(false);
  };

  useEffect(() => {
    const { current } = actionsRef;

    const hideActions = e => {
      if (
        current.classList.contains('pointer-events-none') ||
        e.target.classList.contains('profile-pic-wrapper')
      ) {
        return;
      }
      setActionsVisible(false);
    };

    document.addEventListener('click', hideActions);

    return () => {
      document.removeEventListener('click', hideActions);
    };
  }, []);

  return (
    <div
      onMouseOver={showActions}
      onClick={showActions}
      className="flex items-center h-fit cursor-pointer relative profile-pic-wrapper"
    >
      {/* User profile picture */}
      <img
        src={currentUser.profilePicture}
        alt="Profile Picture"
        className="h-[42px] -z-10 aspect-square rounded-[50%] pfp border-solid"
      />

      <div
        ref={actionsRef}
        onMouseOut={hideActions}
        className={`profile-actions transition-all duration-200 shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] rounded gap-3 
       bg-[#1e1e1ee6] text-[var(--main-text)] text-[0.95rem] p-2 absolute right-0 top-[61px] mt-1 ${
         !actionsVisible
           ? 'opacity-0 pointer-events-none'
           : 'pointer-events-auto'
       }`}
      >
        <div
          role="button"
          onClick={logUserOut}
          className="user-action action-logout rounded transition-colors py-2 px-3 flex items-center gap-3 hover:bg-[#312f2fe6]"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-[1rem]"></i>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
