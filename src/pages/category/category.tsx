import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { CategoryResponseModel } from "../../api/models/category/category-response-model";
import CategoryApi from "../../api/services/category/category-api";
import DeleteModal from "../../components/modals/delete-modal";
import DeleteButton from "../../components/buttons/delete-button/delete-button";
import UpdateButton from "../../components/buttons/update-button/update-button";
import CreateModal from "./create-modal";
import UpdateModal from "./update-modal";

const Category = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<
    CategoryResponseModel | undefined
  >(undefined);
  const [selectedUpdateData, setSelectedUpdateData] = useState<
    CategoryResponseModel | undefined
  >(undefined);
  const [dataSource, setDataSource] = useState<CategoryResponseModel[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "",
      render: (record: CategoryResponseModel) => (
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
      const api = new CategoryApi();
      const products = await api.GetAll();
      setDataSource(products);
    } catch (error) {
      console.error("Kategoriler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async () => {
    if (selectedData) {
      const api = new CategoryApi();
      try {
        await api.Delete(selectedData.id);
      } catch (error) {
        console.error("Kategori silinemedi: ", error);
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
          <Typography.Title level={4} style={{marginTop:"0"}}>Categories</Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            New Category
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
        open={isDeleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={deleteCategory}
      />
      <CreateModal
        open={isCreateModalOpen}
        onCreated={() => {
          setCreateModalOpen(false);
          getAll();
        }}
        onCancel={() => setCreateModalOpen(false)}
      />
      <UpdateModal
        open={isUpdateModalOpen}
        data={selectedUpdateData}
        onCancel={() => setUpdateModalOpen(false)}
        onUpdated={() => {
          setUpdateModalOpen(false);
          getAll();
        }}
      />
    </Space>
  );
};

export default Category;
