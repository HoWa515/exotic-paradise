/*eslint-disable*/
import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useFetchHotels } from "../hotels/useFetchHotels";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoading1,
    numDays,
  } = useRecentStays();
  const { hotels, isLoading: isLoading2 } = useFetchHotels();
  if (isLoading || isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        hotelCount={hotels.length}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
