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
import CategoryApi from "../../api/services/category/category-api";
import { CategoryResponseModel } from "../../api/models/category/category-response-model";
import type { Key } from "react";

const Product = () => {
  const [dataSource, setDataSource] = useState<ProductResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    { text: string; value: string }[]
  >([]);

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
      filters: categories,
      onFilter: (value: boolean | Key, record: ProductResponseModel) =>
        record.categoryName === value,
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
      title: "Action",
      key: "action",
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
    getCategories();
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

  const getCategories = async () => {
    try {
      const api = new CategoryApi();
      const response = await api.GetAll();
      const filterOptions = response.map((cat: CategoryResponseModel) => ({
        text: cat.name,
        value: cat.name, // filtreleme categoryName üzerinden yapıldığı için name kullanıyoruz
      }));
      setCategories(filterOptions);
    } catch (error) {
      console.error("Kategoriler alınamadı:", error);
    }
  };

  const deleteProduct = async () => {
    setLoading(true);
    if (selectedData) {
      try {
        const api = new ProductApi();
        await api.Delete(selectedData.id);
      } catch (error) {
        console.error("Silme hatası:", error);
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
         <Typography.Title level={4}  style={{marginTop:"0"}}>Products</Typography.Title>
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
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
      <DeleteModal
        open={isDeleteModelOpen}
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
        onCreated={() => {
          setCreateModalOpen(false);
          getAll();
        }}
        onCancel={() => setCreateModalOpen(false)}
      />
    </Space>
  );
};

export default Product;
