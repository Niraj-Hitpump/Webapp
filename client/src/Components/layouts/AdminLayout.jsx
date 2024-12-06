import { NavLink, Outlet } from "react-router-dom"
import { ImUsers } from "react-icons/im";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FcServices } from "react-icons/fc";
import { IoHome } from "react-icons/io5";

const AdminLayout = () => {
  return (
    <>
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><NavLink to="/admin/users"><ImUsers />Users</NavLink></li>
            <li><NavLink to="/admin/Contacts"><RiContactsBook3Fill />Contacts</NavLink></li>
            <li><NavLink to="/service"><FcServices />services</NavLink></li>
            <li><NavLink to="/"><IoHome />Home</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
    </>
  )
}

export default AdminLayout