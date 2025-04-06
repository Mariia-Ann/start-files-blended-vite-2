import Modal from "react-modal"
import css from "./ImageModal.module.css"
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement("#root");

const ImageModal = ({modalIsOpen, closeModal, src, alt}) => {
  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        bodyOpenClassName={css.visible}

      >
<img src={src} alt={alt} />
      </Modal>
  )
}

export default ImageModal