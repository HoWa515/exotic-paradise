/*eslint-disable*/
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getHotels } from "../../services/apiHotels";
import Spinner from "./../../ui/Spinner";
import HotelRow from "./HotelRow";
import { useFetchHotels } from "./useFetchHotels";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function HotelTable() {
  const { isLoading, hotels } = useFetchHotels();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  // 1) filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredHotels;
  if (filterValue === "all") filteredHotels = hotels;
  if (filterValue === "no-discount")
    filteredHotels = hotels.filter((h) => h.discount === 0);
  if (filterValue === "with-discount")
    filteredHotels = hotels.filter((h) => h.discount > 0);

  // 2) sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedHotels = filteredHotels.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div> </div>
          <div>Hotel</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body>
          {filteredHotels.map((hotel) => (
            <HotelRow hotel={hotel} key={hotel.id} />
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default HotelTable;
