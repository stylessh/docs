import { useState } from "react";
import { signOut, useSession } from "next-auth/client";

const Profile = () => {
  const [session] = useSession();
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative">
      <img
        onClick={() => setOpenDropdown(!openDropdown)}
        loading="lazy"
        className="cursor-pointer h-10 w-10 rounded-full ml-2 object-cover"
        src={session?.user.image}
        alt="Avatar"
      />

      {openDropdown && (
        <>
          <div
            onClick={() => setOpenDropdown(false)}
            className="fixed inset-0 h-full w-full z-30"
          ></div>

          <div className="absolute right-0 mt-5 py-2 w-48 bg-white rounded-md shadow-lg z-30">
            <div className="flex flex-col text-sm font-display px-4 py-2">
              <p>{session?.user.name}</p>

              <h3 className="font-bold">{session?.user.email}</h3>
            </div>
            {/* divider */}
            <div className="h-0.5 w-full bg-gray-200 my-1"></div>
            <a
              href="#"
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 font-display"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 font-display"
              onClick={signOut}
            >
              Sign Out
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
