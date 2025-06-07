import Heading from "../ui/Heading";
import Row from "../ui/Row";
import HotelTable from "../features/hotels/HotelTable";

function Hotels() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All hotels</Heading>
        <p>Filter Sort </p>
      </Row>
      <Row>
        <HotelTable />
      </Row>
    </>
  );
}

export default Hotels;
