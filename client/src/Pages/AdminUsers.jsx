import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

const AdminUsers = () => {
  const{url}=useAuth();
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/users`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log("Users:", response.data); // Logging the response data
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // delete the user on the delete button
  const deleteUser = async (id) => {
    console.log(`Attempting to delete user with ID: ${id}`); // Log the ID
    try {
      const deleteUrl = `${url}/api/admin/users/${id}`;
      console.log(`Deleting user with URL: ${deleteUrl}`); // Log the full URL
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      toast.success("User deleted successfully");
      // Remove the deleted user from state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete user.";
      toast.error(errorMessage);
    }
  };
  
    

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                const { username, email, phone } = curUser;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>
                      <button><FaRegEdit /></button>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(curUser._id)}><RiDeleteBin6Fill /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;


