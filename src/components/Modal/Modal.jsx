import ReactModal from "react-modal";
import css from "./Modal.module.css";

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
        {/* {children} */}
        <p>Some content in modal window</p>
      </>
    </ReactModal>
  );
}
