import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import DeleteButton from "../../components/buttons/delete-button/delete-button";
import DeleteModal from "../../components/modals/delete-modal";
import { OrderResponseModel } from "../../api/models/order/order-response-model";
import OrderApi from "../../api/services/order/order-api";
import CreateModal from "./create-modal";
import UpdateButton from "../../components/buttons/update-button/update-button";
import UpdateModal from "./update-modal";
import ViewDetailModal from "./view-detail-modal";
import { EyeOutlined } from "@ant-design/icons";

const Order = () => {
  const [dataSource, setDataSource] = useState<OrderResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedData, setSelectedData] = useState<
    OrderResponseModel | undefined
  >(undefined);

  const [selectedUpdateData, setSelectedUpdateData] = useState<
    OrderResponseModel | undefined
  >(undefined);

  const [selectedDetailData, setSelectedDetailData] = useState<
    OrderResponseModel | undefined
  >(undefined);

  const [isDeleteModelOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateModelOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [isCreateModelOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `${amount.toFixed(2)}₺`,
    },
    {
      title: "Item Count",
      key: "items",
      render: (record: OrderResponseModel) => record.items.length,
    },
    {
      title: "Action",
      key: "action",
      render: (record: OrderResponseModel) => (
        <Space>
          <DeleteButton
            onClick={() => {
              setSelectedData(record);
              setDeleteModalOpen(true);
            }}
          />
          <UpdateButton
            onClick={() => {
              setSelectedUpdateData(record);
              setUpdateModalOpen(true);
            }}
          />
          <EyeOutlined
            onClick={() => {
              setSelectedDetailData(record);
              setDetailModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    setLoading(true);
    try {
      const api = new OrderApi();
      const products = await api.GetAll();
      setDataSource(products);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async () => {
    setLoading(true);
    if (selectedData) {
      try {
        const api = new OrderApi();
        await api.Delete(selectedData.id);
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
        setDeleteModalOpen(false);
        getAll();
      }
    }
  };

  return (
    <Space style={{ width: "100%" }} size={20} direction="vertical">
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={4}>Orders</Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            New Order
          </Button>
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        scroll={{ x: "max-content" }}
      />
      <DeleteModal
        open={isDeleteModelOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={deleteOrder}
      />
      <UpdateModal
        open={isUpdateModelOpen}
        order={selectedUpdateData}
        onCancel={() => setUpdateModalOpen(false)}
        onUpdated={() => {
          setUpdateModalOpen(false);
          getAll();
        }}
      />
      <CreateModal
        open={isCreateModelOpen}
        onCreated={() => {
          setCreateModalOpen(false);
          getAll();
        }}
        onCancel={() => setCreateModalOpen(false)}
      />
      <ViewDetailModal
        open={isDetailModalOpen}
        orderData={selectedDetailData}
        onClose={() => setDetailModalOpen(false)}
      />
    </Space>
  );
};

export default Order;
