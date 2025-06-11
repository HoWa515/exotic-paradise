import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateHotelForm from "./CreateHotelForm";

function AddHotel() {
  const [isOpenModal, setisOpenModal] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setisOpenModal((show) => !show);
        }}
      >
        Add new hotel
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setisOpenModal(false)}>
          <CreateHotelForm onCloseModal={() => setisOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddHotel;
