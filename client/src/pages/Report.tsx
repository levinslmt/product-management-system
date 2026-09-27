import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Typography, message } from "antd";
import api from "../api/axios";

const { Title } = Typography;

interface ProductReport {
  totalProducts: number;
  totalQuantity: number;
  totalInventoryValue: number;
}

function Report() {
  const [report, setReport] = useState<ProductReport | null>(null);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const getReport = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products/report");

      setReport(response.data);
    } catch (error: any) {
      console.error(error);

      messageApi.error(
        error.response?.data?.message || "Failed to load report",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <>
      {contextHolder}

      <div>
        <Title level={2}>Product Report</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Products"
                value={report?.totalProducts ?? 0}
                loading={loading}
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Quantity"
                value={report?.totalQuantity ?? 0}
                loading={loading}
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Inventory Value"
                value={report?.totalInventoryValue ?? 0}
                prefix="₱"
                precision={2}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Report;