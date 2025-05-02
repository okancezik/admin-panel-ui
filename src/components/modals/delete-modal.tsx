import { Modal, ModalProps } from "antd";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteModalProps extends ModalProps {}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <Modal {...props}>
      <span>Silmek istediğinizden emin misiniz ?</span>
    </Modal>
  );
};

export default DeleteModal;
