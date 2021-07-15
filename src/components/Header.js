import { MdSearch } from "react-icons/md";
import Profile from "../common/Profile";

const Header = () => {
  return (
    <header className="flex items-center p-2 sticky top-0 z-50 shadow-sm bg-white">
      <h1 className="md:inline-flex ml-2 text-gray-700 text-2xl font-display font-bold">
        Docs
      </h1>

      <div className="flex flex-grow items-center mx-5 md:mx-20 p-2 px-3 bg-gray-100 text-gray-400 rounded-md focus-within:text-gray-600 focus-within:shadow-sm">
        <MdSearch size="1.5em" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow px-2 text-base bg-transparent outline-none font-body"
        />
      </div>

      <Profile />
    </header>
  );
};

export default Header;
