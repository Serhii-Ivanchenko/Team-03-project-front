import ReactModal from "react-modal";
import css from "./Modal.module.css";
import { useEffect } from "react";

// !! Це треба використати в компоненті, в якому викликається відкриття модалки:
//  const [modalIsOpen, setIsOpen] = useState(false);
// const openModal = () => {
//   setIsOpen(true);
// };

// const handleModalClose = () => {
//   setIsOpen(false);
// };

// {<button onClick={openModal}>Open Modal</button>;

// {
//   modalIsOpen && <Modal isOpen={modalIsOpen} onClose={handleModalClose} />;
// }

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <ReactModal
      className={css.modal}
      overlayClassName={css.overlay}
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      onRequestClose={onClose}
      bodyOpenClassName="modal-open"
    >
      <>
        {children}
      </>
    </ReactModal>
  );
}
