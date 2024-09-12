import { useState } from 'react';
import SharedLayout from '../SharedLayout/SharedLayout.jsx'
import './App.css'
import Modal from '../Modal/Modal.jsx';

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <SharedLayout>
      <p>Hello world!</p>
      <button onClick={openModal}>Open Modal</button>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onClose={handleModalClose}
        />
      )}
    </SharedLayout>
  );
}

export default App
