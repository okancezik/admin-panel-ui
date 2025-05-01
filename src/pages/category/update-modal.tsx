import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, ModalProps } from "antd";
import { CategoryUpdateRequestModel } from "../../api/models/category/category-update-request-model";
import CategoryApi from "../../api/services/category/category-api";
import { CategoryResponseModel } from "../../api/models/category/category-response-model";

interface UpdateModalProps extends ModalProps {
  data: CategoryResponseModel | undefined;
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
      });
    }
  }, [data, form]);

  const onFinish = (values: CategoryUpdateRequestModel) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const api = new CategoryApi();
      api.Update(values);
    } catch (error) {
      console.error("Kategori güncellenemedi: ", error);
    } finally {
        props.onUpdated()
      setLoading(false);
    }
  };

  return (
    <Modal {...modalProps} title="Kategori Güncelleme" footer={null}>
      <Form<CategoryUpdateRequestModel>
        form={form}
        layout="vertical"
        style={{ marginTop: "1.5rem" }}
        onFinish={onFinish}
      >
        <Form.Item name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
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
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
