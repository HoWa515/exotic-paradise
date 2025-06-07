import Heading from "../ui/Heading";
import Row from "../ui/Row";
import HotelTable from "../features/hotels/HotelTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateHotelForm from "./../features/hotels/CreateHotelForm";

function Hotels() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All hotels</Heading>
        <p>Filter Sort </p>
      </Row>
      <Row>
        <HotelTable />
        <Button
          onClick={() => {
            setShowForm((show) => !show);
          }}
        >
          Add new hotel
        </Button>
        {showForm && <CreateHotelForm />}
      </Row>
    </>
  );
}

export default Hotels;
