import { Modal, ModalProps } from "antd";
import { ProductResponseModel } from "../../api/models/product/product-response-model";
import { CategoryResponseModel } from "../../api/models/category/category-response-model";
import { CustomerResponseModel } from "../../api/models/customer/customer-response-model";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteModalProps extends ModalProps{
    data: ProductResponseModel | CategoryResponseModel| CustomerResponseModel| undefined;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Modal
      {...props}
    >
     {props.data && <span>{props.data.id} Silmek istediğinizden emin misiniz ?</span>} 
    </Modal>
  );
};

export default DeleteModal;
