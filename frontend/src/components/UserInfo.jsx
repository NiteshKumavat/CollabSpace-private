const UserInfo = ({ user, click }) => {

  const { fullName, bio, profilePicture } = user;

  return (
    <div className="flex items-center gap-4 p-5 w-full rounded-2xl 
      bg-gradient-to-r from-blue-500 to-pink-200 border border-purple-200 shadow-md
      hover:shadow-xl hover:scale-[1.02] transition-all mt-5" onClick={click}>

      <img
        src={profilePicture || "https://avatar.iran.liara.run/public"}
        alt={fullName}
        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
      />

      <div>
        <h2 className="font-semibold text-lg text-purple-900">
          {fullName}
        </h2>
        <p className="text-gray-700 text-sm break-words max-w-[300px] mt-1">
          {bio || "No bio added yet."}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;