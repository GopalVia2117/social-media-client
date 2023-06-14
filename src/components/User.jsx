import { Person } from "@mui/icons-material";

function User({ user }) {
  return (
    <div className="inline-block w-max">
      <div className="flex items-center mt-2 cursor-pointer hover:bg-gray-100 p-2">
        {user?.profilePicture ? (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={`${user.profilePicture}`}
            alt=""
          />
        ) : (
          <span className="border border-white rounded-full p-2">
            <Person htmlColor="lightgray" />
          </span>
        )}
        <span className="text-lg font-medium ml-2">{user?.username}</span>
      </div>
    </div>
  );
}

export default User;
