import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, ModalProps, Select } from "antd";
import ProductApi from "../../api/services/product/product-api";
import { ProductCreateRequestModel } from "../../api/models/product/product-create-request-model";
import CategoryApi from "../../api/services/category/category-api";
import { CategoryResponseModel } from "../../api/models/category/category-response-model";

interface CreateModalProps extends ModalProps {
  onCreated: () => void;
}

const CreateModal = (props: CreateModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryResponseModel[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = new CategoryApi();
    const response = await api.GetAll();
    setCategories(response);
  };

  const onFinish = async (values: ProductCreateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const productApi = new ProductApi();
      await productApi.Create(values);
    } catch (error) {
      console.error("Ürün güncellenemedi: ", error);
    } finally {
      props.onCreated();
      setLoading(false);
      form.resetFields()
    }
  };

  return (
    <Modal {...props} title="Yeni Ürün Ekle" footer={null}>
      <Form<ProductCreateRequestModel>
        form={form}
        layout="vertical"
        style={{ marginTop: "1.5rem" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Ürün Adı"
          name="name"
          rules={[{ required: true, message: "Ürün adı zorunludur" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Açıklama"
          name="description"
          rules={[{ required: true, message: "Açıklama zorunludur" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stok Miktarı"
          name="stock"
          rules={[{ required: true, message: "Stok miktarı zorunludur" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="price"
          rules={[{ required: true, message: "Fiyat zorunludur" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Kategori zorunludur" }]}
        >
          <Select
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} htmlType="submit" type="primary">
            Ekle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;