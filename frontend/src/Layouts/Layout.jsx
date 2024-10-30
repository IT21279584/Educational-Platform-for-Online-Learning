
import PropTypes from "prop-types";
import { Sidebar } from "../Pages/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
