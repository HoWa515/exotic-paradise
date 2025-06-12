/*eslint-disable*/
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateHotelForm from "./CreateHotelForm";
import { useDeleteHotel } from "./useDeleteHotel";
import { HiPencil, HiTrash } from "react-icons/hi";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Hotel = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// ==============================================
//=======component
function HotelRow({ hotel }) {
  const {
    id: hotelId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = hotel;

  const { isDeleting, deleteHotel } = useDeleteHotel();
  return (
    <>
      <Table.Row role="row">
        <img src={image} alt="hotel image" />
        <Hotel>{name}</Hotel>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={hotelId}></Menus.Toggle>
              <Menus.List id={hotelId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateHotelForm hotelToEdit={hotel} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="hotels"
                disabled={isDeleting}
                onConfirm={() => deleteHotel(hotelId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default HotelRow;
