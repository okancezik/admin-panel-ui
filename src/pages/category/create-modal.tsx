import {  useState } from "react";
import { Button, Form, Input, Modal, ModalProps } from "antd";
import CategoryApi from "../../api/services/category/category-api";
import { CategoryCreateRequestModel } from "../../api/models/category/category-create-request-model";

interface CreateModalProps extends ModalProps {
  onCreated: () => void;
}

const CreateModal = (props: CreateModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish = async (values: CategoryCreateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const api = new CategoryApi();
      await api.Create(values);
    } catch (error) {
      console.error("Ürün güncellenemedi: ", error);
    } finally {
      props.onCreated();
      setLoading(false);
      form.resetFields()
    }
  };

  return (
    <Modal {...props} title="Yeni Kategori Ekle" footer={null}>
      <Form<CategoryCreateRequestModel>
        form={form}
        layout="vertical"
        style={{ marginTop: "1.5rem" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Kategori Adı"
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
