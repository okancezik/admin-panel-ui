import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputNumber,
  Modal,
  ModalProps,
  Select,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { OrderCreateRequestModel } from "../../api/models/order/order-create-request-model";
import OrderApi from "../../api/services/order/order-api";
import CustomerApi from "../../api/services/customer/customer-api";
import ProductApi from "../../api/services/product/product-api";
import { ProductResponseModel } from "../../api/models/product/product-response-model";
import { CustomerResponseModel } from "../../api/models/customer/customer-response-model";

interface CreateModalProps extends ModalProps {
  onCreated: () => void;
}

interface CustomerOption {
  label: string;
  value: string; // UUID
}

interface ProductOption {
  label: string;
  value: string; // UUID
}

const CreateModal = (props: CreateModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerApi = new CustomerApi();
        const customers = await customerApi.GetAll();
        const options = customers.map((c: CustomerResponseModel) => ({
          label: `${c.firstname} ${c.lastname} (${c.email})`,
          value: c.id,
        }));
        setCustomerOptions(options);
      } catch (error) {
        console.error("Müşteri listesi alınamadı:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productApi = new ProductApi();
        const products = await productApi.GetAll();
        const options = products.map((p: ProductResponseModel) => ({
          label: `${p.name} (${p.stock} adet) - ₺${p.price}`,
          value: p.id,
        }));
        setProductOptions(options);
      } catch (error) {
        console.error("Ürün listesi alınamadı:", error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const onFinish = async (values: OrderCreateRequestModel) => {
    setLoading(true);
    try {
      const orderApi = new OrderApi();
      await orderApi.Create(values);
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error);
    } finally {
      props.onCreated();
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Modal {...props} title="Yeni Sipariş Oluştur" footer={null}>
      <Form<OrderCreateRequestModel>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: "1.5rem" }}
      >
        <Form.Item
          label="Müşteri"
          name="customerId"
          rules={[{ required: true, message: "Müşteri seçimi zorunludur" }]}
        >
          <Select
            showSearch
            placeholder="Müşteri seçiniz"
            options={customerOptions}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.List name="orderItems">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "productId"]}
                    rules={[{ required: true, message: "Ürün seçimi zorunludur" }]}
                  >
                    <Select
                      showSearch
                      placeholder="Ürün seçiniz"
                      options={productOptions}
                      style={{ width: 250 }}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Adet zorunludur" }]}
                  >
                    <InputNumber placeholder="Adet" min={1} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Ürün Ekle
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button loading={loading} htmlType="submit" type="primary">
            Sipariş Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
