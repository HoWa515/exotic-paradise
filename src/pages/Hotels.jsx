import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getHotels } from "../services/apiHotels";

function Hotels() {
  useEffect(function () {
    getHotels().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All hotels</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Hotels;
