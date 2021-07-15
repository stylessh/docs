import { useState } from "react";

import Header from "../components/Header";
import Login from "../components/Login";
import DocumentRow from "../components/DocumentRow";
import { getSession, useSession } from "next-auth/client";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

import { BsPlus, BsFolderFill } from "react-icons/bs";
import Head from "../components/Head";

export default function Home() {
  const [session] = useSession();

  // if there's no logged user
  if (!session) return <Login />;

  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [document, setDocument] = useState("");

  // getting docs by most recent
  const [snapshot] = useCollectionOnce(
    db
      .collection("user_docs")
      .doc(session?.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const createDocument = async () => {
    if (!document) return;

    // saving document
    try {
      const res = await db
        .collection("user_docs")
        .doc(session.user.email)
        .collection("docs")
        .add({
          file_name: document,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      // redirecting to text editor
      router.push(`/doc/${res.id}`);
    } catch (error) {
      console.error(error);
    }

    // cleaning states
    setDocument("");
    setOpenModal(false);
  };

  const Modal = (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <input
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                type="text"
                placeholder="Document's name..."
                className="h-hull w-full outline-none font-body text-gray-700"
                onKeyDown={(e) => {
                  e.key === "Enter" && createDocument();
                  e.key === "Escape" && setOpenModal(false);
                }}
                autoFocus
              />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 py-3 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 font-display hover:bg-blue-100 hover:text-blue-700"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 font-display"
                type="button"
                onClick={createDocument}
              >
                Create Document
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 h-full w-full z-40 opacity-10 bg-black"></div>
    </>
  );

  return (
    <div className="">
      <Head title="Home" />

      <Header />

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6">
            <h2 className="text-gray-700 text-lg font-display font-bold">
              Start a new document
            </h2>
          </div>

          <div>
            <div
              className="bg-white h-44 w-32 cursor-pointer border-2 hover:border-gray-900 flex justify-center items-center text-gray-700 transition ease-in-out duration-200"
              onClick={() => setOpenModal(true)}
            >
              <BsPlus size="2em" />
            </div>

            <h4 className="text-sm font-body font-normal ml-2 mt-2">
              Blank page
            </h4>
          </div>
        </div>

        {openModal && Modal}
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5 text-gray-700 font-display font-bold">
            <h2 className="flex-grow">My Documents</h2>

            <p className="mr-12">Date created</p>

            <BsFolderFill size="1em" />
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow key={doc.id} id={doc.id} data={doc.data()} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}
