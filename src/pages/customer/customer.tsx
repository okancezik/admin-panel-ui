import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import CustomerApi from "../../api/services/customer/customer-api";
import { CustomerResponseModel } from "../../api/models/customer/customer-response-model";
import CreateModal from "./create-modal";
import DeleteButton from "../../components/buttons/delete-button/delete-button";
import UpdateButton from "../../components/buttons/update-button/update-button";
import UpdateModal from "./update-modal";
import DeleteModal from "../../components/modals/delete-modal";

function Customer() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<CustomerResponseModel[]>([]);
  const [selectedUpdateData, setSelectedUpdateData] = useState<
    CustomerResponseModel | undefined
  >(undefined);
  const [selectedData, setSelectedData] = useState<
    CustomerResponseModel | undefined
  >(undefined);
  const [isCreateModelOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModelOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModelOpen, setDeleteModalOpen] = useState<boolean>(false);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "LastName",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      key: "",
      render: (record: CustomerResponseModel) => (
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
      const api = new CustomerApi();
      const customers = await api.GetAll();
      setDataSource(customers);
    } catch (error) {
      console.error("Müşteriler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async () => {
    setLoading(true);
    if (selectedData) {
      try {
        const api = new CustomerApi();
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
          <Typography.Title level={4} style={{ marginTop: "0" }}>
            Customers
          </Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            New Customer
          </Button>
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <CreateModal
        open={isCreateModelOpen}
        onCreated={() => {
          setCreateModalOpen(false);
          getAll();
        }}
        onCancel={() => setCreateModalOpen(false)}
      />
      <UpdateModal
        open={isUpdateModelOpen}
        data={selectedUpdateData}
        onCancel={() => setUpdateModalOpen(false)}
        onUpdated={() => {
          setUpdateModalOpen(false);
          getAll();
        }}
      />
      <DeleteModal
        open={isDeleteModelOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={deleteCustomer}
      />
    </Space>
  );
}
export default Customer;
