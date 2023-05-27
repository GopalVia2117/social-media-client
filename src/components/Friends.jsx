function Friends({ user }) {
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={"/" + user.profilePicture}
          alt=""
        />
      </div>
      <span className="font-medium ml-2">{user.username}</span>
    </div>
  );
}

export default Friends;
