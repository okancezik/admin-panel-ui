import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, ModalProps } from "antd";
import { ProductUpdateRequestModel } from "../../api/models/product/product-update-request-model";
import ProductApi from "../../api/services/product/product-api";

interface UpdateModalProps extends ModalProps {
  data: ProductUpdateRequestModel | undefined;
  onUpdated: ()=>void
}

const UpdateModal = (props: UpdateModalProps) => {
  const { data,  ...modalProps } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        description: data.description,
        stock: data.stock,
        price: data.price,
      });
    }
  }, [data, form]);

  const onFinish = (values: ProductUpdateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const productApi = new ProductApi();
      productApi.Update(values);
    } catch (error) {
      console.error("Ürün güncellenemedi: ", error);
    } finally {
        props.onUpdated()
      setLoading(false);
    }
  };

  return (
    <Modal {...modalProps} title="Ürün Güncelleme" footer={null}>
      <Form
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
