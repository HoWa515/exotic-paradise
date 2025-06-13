import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function HotelTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "regularPrice-asc", label: "Price low-high" },
          { value: "regularPrice-desc", label: "Price high-low" },
          { value: "maxCapacity-asc", label: "Capacity low-high" },
          { value: "maxCapacity-desc", label: "Capacity high-low" },
        ]}
      />
    </TableOperations>
  );
}

export default HotelTableOperations;
