import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, ModalProps } from "antd";
import { CustomerUpdateRequestModel } from "../../api/models/customer/customer-update-request-modal";
import CustomerApi from "../../api/services/customer/customer-api";
import { CustomerResponseModel } from "../../api/models/customer/customer-response-model";

interface UpdateModalProps extends ModalProps {
  data: CustomerResponseModel | undefined;
  onUpdated: () => void;
}

const UpdateModal = (props: UpdateModalProps) => {
  const { data, ...modalProps } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
    }
  }, [data, form]);

  const onFinish = (values: CustomerUpdateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const api = new CustomerApi();
      api.Update(values);
    } catch (error) {
      console.error("Ürün güncellenemedi: ", error);
    } finally {
      props.onUpdated();
      setLoading(false);
    }
  };

  return (
    <Modal {...modalProps} title="Ürün Güncelleme" footer={null}>
      <Form<CustomerUpdateRequestModel>
        form={form}
        layout="vertical"
        style={{ marginTop: "1.5rem" }}
        onFinish={onFinish}
      >
        <Form.Item name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
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
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Telefon"
          name="phone"
          rules={[{ required: true, message: "Telefon zorunludur" }]}
        >
          <Input type="phone" />
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

export default UpdateModal;
