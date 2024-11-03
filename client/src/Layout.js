import { Outlet, useHref } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={outletStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        https://www.youtube.com/watch?v=d1YBv2mWll0
      </div>
    </>
  );
};

function outletStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "grey 2px solid",
    borderBottom: "green 2px solid",
  };
}
function footerStyle() {
  return {
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#23b2c4",
    bottom: 0,
  };
}
export default Layout;
