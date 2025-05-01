import { Button, Col, Row, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import ProductApi from "../../api/services/product/product-api";
import { ProductResponseModel } from "../../api/models/product/product-response-model";
import DeleteButton from "../../components/buttons/delete-button/delete-button";
import DeleteModal from "../../components/modals/delete-modal";
import UpdateButton from "../../components/buttons/update-button/update-button";
import UpdateModal from "./update-modal";
import { ProductUpdateRequestModel } from "../../api/models/product/product-update-request-model";
import CreateModal from "./create-modal";

const Product = () => {
  const [dataSource, setDataSource] = useState<ProductResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedData, setSelectedData] = useState<
    ProductResponseModel | undefined
  >(undefined);

  const [selectedUpdateData, setSelectedUpdateData] = useState<
    ProductUpdateRequestModel | undefined
  >(undefined);

  const [isDeleteModelOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateModelOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [isCreateModelOpen, setCreateModalOpen] = useState<boolean>(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      title: "Action",
      key: "",
      render: (record: ProductResponseModel) => (
        <Space>
          <DeleteButton
            onClick={() => {
              setSelectedData(record);
              setDeleteModalOpen(true);
            }}
          />
          <UpdateButton
            onClick={() => {
              setSelectedUpdateData({
                id: record.id,
                name: record.name,
                description: record.name,
                price: record.price,
                stock: record.stock,
              } as ProductUpdateRequestModel);
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
      const api = new ProductApi();
      const products = await api.GetAll();
      setDataSource(products);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    setLoading(true);
    if (selectedData) {
      try {
        const api = new ProductApi();
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
    <Space style={{width:"100%"}} size={20} direction="vertical">
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={4}>Products</Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            Yeni Ürün
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
        data={selectedData}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={deleteProduct}
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
      <CreateModal 
        open={isCreateModelOpen}
        onCreated={()=>{
            setCreateModalOpen(false)
            getAll()
        }}
        onCancel={()=>setCreateModalOpen(false)}
      />
    </Space>
  );
};

export default Product;
