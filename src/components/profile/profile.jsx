const Profile = ({ currentUser }) => {
  return (
    <a href="/profile" className="flex items-center h-fit">
      {/* User profile picture */}
      <img
        src={currentUser.profilePicture}
        alt="Profile Picture"
        className="h-[50px] aspect-square rounded-[50%] pfp border-solid"
      />
    </a>
  );
};

export default Profile;
