import { Card, Col, Row } from "antd";

const DashboardContainer = () => {
  return (
    <>
      <Row gutter={24}>
        <Col span={"8"}>
          <Card title="Projects"></Card>
        </Col>
        <Col span={"8"}>
          <Card title="Tasks"></Card>
        </Col>
        <Col span={"8"}>
          <Card
            title="Users"
            children={
              <>
                <p>Admin -2</p>
                <p>Admin -2</p>
                <p>Task -2</p>
              </>
            }
          ></Card>
        </Col>
      </Row>
    </>
  );
};
export default DashboardContainer;
