/*eslint-disable*/
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, hotelCount }) {
  // 1. bookings
  const numBookings = bookings.length;

  // 2.sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // 3.
  const checkins = confirmedStays.length;
  // 4.
  const occupatNights = confirmedStays.reduce(
    (cur, acc) => acc + cur.numNights,
    0
  );

  const totalNights = numDays * hotelCount;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales revenue"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      {/* <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={checkins}
      /> */}
    </>
  );
}

export default Stats;
