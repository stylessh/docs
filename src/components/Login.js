import { signIn } from "next-auth/client";
import { HiOutlineDocumentText } from "react-icons/hi";

import { Row, Button, Text, Col } from "@geist-ui/react";

const Login = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Col style={{ textAlign: "center" }}>
        <HiOutlineDocumentText size="6em" />

        <Text h1>Docs</Text>

        <Button type="success" ghost auto onClick={signIn}>
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
