import OverviewProvider from "./OverviewProvider";
import ListDetailProvider from "../ListDetail/ListDetailProvider";

function Overview() {
  return (
    <ListDetailProvider>
      <OverviewProvider />
    </ListDetailProvider>
  );
}

export default Overview;
