import Login from "../../components/Login";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import TextEditor from "../../components/TextEditor";
import Profile from "../../common/Profile";
import Head from "../../components/Head";

import { BsArrowLeft } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";

const Document = ({ id }) => {
  const [session] = useSession();

  //   if there's no logged user
  if (!session) return <Login />;

  const router = useRouter();
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db
      .collection("user_docs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id)
  );

  //   if document doesn't exist
  if (!loadingSnapshot && !snapshot.data()?.file_name) {
    router.replace("/");
  }

  return (
    <div>
      <Head title={snapshot?.data()?.file_name} />

      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <BsArrowLeft size="2em" />
        </span>

        <div className="flex-grow px-4">
          <h2 className="font-display font-bold">
            {snapshot?.data()?.file_name}
          </h2>

          <div className="flex text-sm items-center space-x-1 -ml-1 h-8">
            <p className="px-2 cursor-pointer text-gray-600 hover:bg-gray-100 transition ease-in-out transition-200">
              File
            </p>
            <p className="px-2 cursor-pointer text-gray-600 hover:bg-gray-100 transition ease-in-out transition-200">
              Edit
            </p>
            <p className="px-2 cursor-pointer text-gray-600 hover:bg-gray-100 transition ease-in-out transition-200">
              View
            </p>
            <p className="px-2 cursor-pointer text-gray-600 hover:bg-gray-100 transition ease-in-out transition-200">
              Insert
            </p>
            <p className="px-2 cursor-pointer text-gray-600 hover:bg-gray-100 transition ease-in-out transition-200">
              Tools
            </p>
          </div>
        </div>

        <button className="bg-blue-500 text-white uppercase font-display font-bold px-5 py-2 text-sm mr-5 rounded hover:bg-blue-600 transition ease-in-out transition-100">
          <RiShareForwardLine size="1.2em" className="inline" /> Share
        </button>

        <Profile />
      </header>

      <TextEditor doc_id={id} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      id: ctx.params.id,
      session,
    },
  };
}

export default Document;
