import { MdSearch } from "react-icons/md";
import Profile from "../common/Profile";

import { Row, Col, Text, Input } from "@geist-ui/react";

const Header = () => {
  return (
    <Row
      justify="space-between"
      align="middle"
      gap={2}
      style={{ padding: "1em 0" }}
    >
      <Col span={4}>
        <Text h1 size="2em">
          Docs
        </Text>
      </Col>

      <Col span={16}>
        <Input
          icon={<MdSearch size="1.5em" />}
          placeholder="Search"
          width="100%"
        />
      </Col>

      <Col span={4} style={{ textAlign: "center" }}>
        <Profile />
      </Col>
    </Row>
  );
};

export default Header;
