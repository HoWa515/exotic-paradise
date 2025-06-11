import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateHotelForm from "./CreateHotelForm";

function AddHotel() {
  return (
    <Modal>
      {/* opens prop is added for open only one window at a time  */}
      <Modal.Open opens="hotel-form">
        <Button>Add new hotel</Button>
      </Modal.Open>
      <Modal.Window name="hotel-form">
        <CreateHotelForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Add new hotel</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <HotelTable/>
      </Modal.Window> */}
    </Modal>
  );
}
// function AddHotel() {
//   const [isOpenModal, setisOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => {
//           setisOpenModal((show) => !show);
//         }}
//       >
//         Add new hotel
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setisOpenModal(false)}>
//           <CreateHotelForm onCloseModal={() => setisOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddHotel;
