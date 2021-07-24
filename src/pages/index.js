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

import {
  Text,
  Modal,
  Page,
  Card,
  Input,
  Grid,
  Loading,
  Divider,
} from "@geist-ui/react";

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

  return (
    <>
      <Head title="Home" />

      <Header />

      <Page>
        <div>
          <Text h3>Start a new document</Text>

          <div>
            <Card
              hoverable
              width="150px"
              style={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => setOpenModal(true)}
            >
              <BsPlus size="2em" />
            </Card>

            <Text p>Blank page</Text>
          </div>

          {/* Modal */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            {/*header*/}

            <Modal.Title>Create Document</Modal.Title>

            <Modal.Content>
              <Input
                width="100%"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                type="text"
                placeholder="Document's name..."
                onKeyDown={(e) => {
                  e.key === "Enter" && createDocument();
                  e.key === "Escape" && setOpenModal(false);
                }}
                autoFocus
              />
            </Modal.Content>

            {/*footer*/}
            <Modal.Action passive onClick={() => setOpenModal(false)}>
              Cancel
            </Modal.Action>
            <Modal.Action onClick={createDocument}>
              Create Document
            </Modal.Action>
          </Modal>
        </div>

        <Divider y={5} />

        <div>
          <Grid.Container justify="space-between" alignItems="center">
            <Grid md={12}>
              <Text h3>My Documents</Text>
            </Grid>
            <Grid md={6} alignItems="center" justify="flex-end">
              <Text p b>
                Date created
              </Text>
            </Grid>
            <Grid md={6} alignItems="center" justify="flex-end">
              <BsFolderFill size="1em" />
            </Grid>
          </Grid.Container>

          {snapshot ? (
            <>
              {snapshot?.docs.map((doc) => (
                <DocumentRow key={doc.id} id={doc.id} data={doc.data()} />
              ))}
            </>
          ) : (
            <Loading size="medium" />
          )}
        </div>
      </Page>
    </>
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
