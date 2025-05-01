import {  useState } from "react";
import { Button, Form, Input, Modal, ModalProps } from "antd";
import { CustomerCreateRequestModel } from "../../api/models/customer/customer-create-request-model";
import CustomerApi from "../../api/services/customer/customer-api";

interface CreateModalProps extends ModalProps {
  onCreated: () => void;
}

const CreateModal = (props: CreateModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const onFinish = async (values: CustomerCreateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const api = new CustomerApi();
      await api.Create(values);
    } catch (error) {
      console.error("Müşteri eklenemedi: ", error);
    } finally {
      props.onCreated();
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Modal {...props} title="Yeni Ürün Ekle" footer={null}>
      <Form<CustomerCreateRequestModel>
        form={form}
        layout="vertical"
        style={{ marginTop: "1.5rem" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Adı"
          name="firstname"
          rules={[{ required: true, message: "Ad zorunludur" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Soyadı"
          name="lastname"
          rules={[{ required: true, message: "Soyadı zorunludur" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email zorunludur" }]}
        >
          <Input type="email"/>
        </Form.Item>
        <Form.Item
          label="Telefon"
          name="phone"
          rules={[{ required: true, message: "Telefon zorunludur" }]}
        >
          <Input type="phone"/>
        </Form.Item>
        <Form.Item
          label="Adres"
          name="address"
          rules={[{ required: true, message: "Adres zorunludur" }]}
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
