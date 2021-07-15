import { signIn } from "next-auth/client";
import { HiOutlineDocumentText } from "react-icons/hi";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
      <HiOutlineDocumentText size="8em" />

      <h1 className="text-gray-700 font-display font-bold text-2xl">Docs</h1>

      <button
        className="bg-blue-600 text-white px-8 py-2 my-5 rounded-lg font-display font-bold hover:bg-blue-700 drop-shadow-lg"
        onClick={signIn}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
