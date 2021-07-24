import { useState } from 'react'
import Login from "../../components/Login";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import TextEditor from "../../components/TextEditor";
import Profile from "../../common/Profile";
import Head from "../../components/Head";
import { useDocumentContext } from "../../context/document";

import { BsArrowLeft } from "react-icons/bs";
import { RiShareForwardLine } from "react-icons/ri";

import { Grid, Text, Row, Col, Button, Link } from "@geist-ui/react";

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
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const { downloadPDF } = useDocumentContext();

  //   if document doesn't exist
  if (!loadingSnapshot && !snapshot.data()?.file_name) {
    router.replace("/");
  }

  return (
    <div>
      <Head title={snapshot?.data()?.file_name} />

      <Row
        justify="space-between"
        align="middle"
        gap={2}
        style={{ padding: "1em 0" }}
      >
        <Col
          span={1}
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <BsArrowLeft size="2em" />
        </Col>

        <Col>
          <Text h1 size="large">
            {snapshot?.data()?.file_name}
          </Text>

          <Row style={{ marginLeft: "-.5em" }}>
            <Link block href="#">
              File
            </Link>
            <Link block href="#">
              Edit
            </Link>
            <Link block href="#">
              View
            </Link>
            <Link block href="#">
              Insert
            </Link>
            <Link block href="#">
              Tools
            </Link>
          </Row>
        </Col>

        <Col span={4}>
          <Button
            size="medium"
            type="success"
            icon={<RiShareForwardLine />}
            onClick={() => {
              setDownloadingPDF(true);
              downloadPDF(snapshot?.data()?.file_name);
              setDownloadingPDF(false);
            }}
            style={{ width: "100%" }}
            loading={downloadingPDF}
            auto
          >
            Export (PDF)
          </Button>
        </Col>

        <Col span={4} style={{ textAlign: "center" }}>
          <Profile />
        </Col>
      </Row>

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
