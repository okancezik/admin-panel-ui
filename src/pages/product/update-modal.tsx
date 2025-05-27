import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, ModalProps, Select } from "antd";
import { ProductUpdateRequestModel } from "../../api/models/product/product-update-request-model";
import ProductApi from "../../api/services/product/product-api";
import CategoryApi from "../../api/services/category/category-api";
import { CategoryResponseModel } from "../../api/models/category/category-response-model";

interface UpdateModalProps extends ModalProps {
  data: ProductUpdateRequestModel | undefined;
  onUpdated: () => void;
}

const UpdateModal = (props: UpdateModalProps) => {
  const { data, ...modalProps } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);

  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      console.log("data: ", data); // bunu ekle

      form.setFieldsValue({
        id: data.id,
        name: data.name,
        description: data.description,
        stock: data.stock,
        price: data.price,
        categoryId: data.categoryId,
      });
    }
  }, [data, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryApi = new CategoryApi();
        const data = await categoryApi.GetAll();
        setCategories(
          data.map((c: CategoryResponseModel) => ({
            label: c.name,
            value: c.id,
          }))
        );
      } catch (error) {
        console.error("Kategori verisi alınamadı", error);
      }
    };

    fetchCategories();
  }, []);

  const onFinish = (values: ProductUpdateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const productApi = new ProductApi();
      productApi.Update(values);
    } catch (error) {
      console.error("Ürün güncellenemedi: ", error);
    } finally {
      props.onUpdated();
      setLoading(false);
    }
  };

  return (
    <Modal {...modalProps} title="Ürün Güncelleme" footer={null}>
      <Form<ProductUpdateRequestModel>
        form={form}
        layout="vertical"
        style={{ marginTop: "1.5rem" }}
        onFinish={onFinish}
      >
        <Form.Item name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
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
          label="Image"
          name="image"
          rules={[{ required: true, message: "Görsel zorunludur" }]}
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
          label="Kategori"
          name="categoryId"
          rules={[{ required: true, message: "Kategori seçimi zorunludur" }]}
        >
          <Select options={categories} placeholder="Kategori seçin" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} htmlType="submit" type="primary">
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;

//kategori güncelleme eklensin product'a
//products, orders sayfalarına filtre
//inital kayıt için sql dosya
