function Online({ user }) {
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={"/" + user.profilePicture}
          alt=""
        />
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-500"></span>
      </div>
      <span className="font-medium ml-2">{user.username}</span>
    </div>
  );
}

export default Online;
