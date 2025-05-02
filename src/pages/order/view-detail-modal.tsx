import { Modal, Typography, Space, List, ModalProps } from "antd";
import { OrderResponseModel } from "../../api/models/order/order-response-model";
import { OrderItemResponse } from "../../api/models/order/order-item-response-model";

interface ViewDetailModalProps extends ModalProps {
  orderData: OrderResponseModel | undefined;
  onClose: () => void;
}

const ViewDetailModal = (props: ViewDetailModalProps) => {
  return (
    <Modal
      title="Sipariş Detayları"
      open={props.open}
      onCancel={props.onClose}
      footer={null}
      width={600}
    >
      {props.orderData ? (
        <>
          <Typography.Title level={4}>Sipariş Bilgileri</Typography.Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Typography.Text>
              <strong>Müşteri Adı: </strong>
              {props.orderData.customerName}
            </Typography.Text>
            <Typography.Text>
              <strong>Email: </strong>
              {props.orderData.customerEmail}
            </Typography.Text>
            <Typography.Text>
              <strong>Toplam Tutar: </strong>
              {props.orderData.totalAmount.toFixed(2)}₺
            </Typography.Text>
            <Typography.Text>
              <strong>Item Sayısı: </strong>
              {props.orderData.items.length}
            </Typography.Text>
            <Typography.Title level={5}>Ürünler</Typography.Title>
            <List
              size="small"
              dataSource={props.orderData.items}
              renderItem={(item: OrderItemResponse) => (
                <List.Item>
                  <Typography.Text>
                    {item.productName} - {item.quantity} adet - ₺
                    {item.price.toFixed(2)}
                  </Typography.Text>
                </List.Item>
              )}
            />
          </Space>
        </>
      ) : (
        <Typography.Text>Veri yükleniyor...</Typography.Text>
      )}
    </Modal>
  );
};

export default ViewDetailModal;
