import ReactModal from "react-modal";
import css from "./Modal.module.css";

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
  return (
    <ReactModal
      className={css.modal}
      overlayClassName={css.overlay}
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      onRequestClose={onClose}
    >
      <>
        <button onClick={onClose}>close</button>
        {children}
      </>
    </ReactModal>
  );
}
