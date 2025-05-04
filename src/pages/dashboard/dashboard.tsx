import { Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import OrderApi from "../../api/services/order/order-api";
import { OrderResponseModel } from "../../api/models/order/order-response-model";
import { useNavigate } from "react-router-dom";
import APCard from "../../components/card/ap-card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderResponseModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const api = new OrderApi();
      const data = await api.GetAll();
      setOrders(data);
    } catch (err) {
      console.error("Siparişler alınırken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const uniqueCustomers = new Set(orders.map((o) => o.customerEmail)).size;

  const recentOrders = orders.slice(0, 5).map((order) => ({
    key: order.id,
    customerName: order.customerName,
    email: order.customerEmail,
    totalAmount: `${order.totalAmount.toFixed(2)}₺`,
    itemCount: order.items.length,
  }));

  return (
    <Space style={{ width: "100%" }} size={20} direction="vertical">
      <Typography.Title level={3} style={{marginTop:"0"}}>Dashboard</Typography.Title>

      <Row gutter={16}>
        <Col span={6}>
          <APCard style={{"cursor":"pointer"}} onClick={() => navigate("/order")}>
            <Statistic
              title="Total Orders"
              value={orders.length}
              prefix={<ShoppingCartOutlined />}
              loading={loading}
            />
          </APCard>
        </Col>
        <Col span={6}>
          <APCard>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="₺"
              loading={loading}
            />
          </APCard>
        </Col>
        <Col span={6}>
          <APCard style={{"cursor":"pointer"}} onClick={() => navigate("/customer")}>
            <Statistic
              title="Unique Customers"
              value={uniqueCustomers}
              prefix={<UserOutlined />}
              loading={loading}
            />
          </APCard>
        </Col>
        <Col span={6}>
          <APCard>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="₺"
              valueStyle={{ color: "#3f8600" }}
            />
            <div style={{ color: "#3f8600", fontSize: 12 }}>
              ▲ 12.5% from last week
            </div>
          </APCard>
        </Col>
      </Row>

      <Card title="Recent Orders" style={{ marginTop: 24 }}>
        <Table
          columns={[
            {
              title: "Customer",
              dataIndex: "customerName",
              key: "customerName",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Total",
              dataIndex: "totalAmount",
              key: "totalAmount",
            },
            {
              title: "Items",
              dataIndex: "itemCount",
              key: "itemCount",
            },
          ]}
          dataSource={recentOrders}
          pagination={false}
          loading={loading}
        />
      </Card>
    </Space>
  );
};

export default Dashboard;
