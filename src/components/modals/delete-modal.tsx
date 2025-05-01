import React from "react";
import { Modal, ModalProps } from "antd";
import { ProductResponseModel } from "../../api/models/product/product-response-model";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteModalProps extends ModalProps{
    data: ProductResponseModel |undefined;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Modal
      {...props}
    >
     {props.data && <span>{props.data.name} Silmek istediğinizden emin misiniz ?</span>} 
    </Modal>
  );
};

export default DeleteModal;
