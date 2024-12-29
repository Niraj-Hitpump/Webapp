import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"; // Ensure this is properly imported and configured

const AdminContact = () => {
  const {url}=useAuth();
  const [contact, setContact] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactData = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/contacts`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      setContact(response.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${url}/api/admin/contacts/${id}`, {
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
            },
          });
          console.log(response.data);
        toast.success("Contact deleted successfully");
    } catch (error) {
        toast.error("Error deleting contact: " + error.message);
    }
};


  useEffect(() => {
    getContactData();
  }, []);

  return (
    <section className="admin-contact-container">
      <h1 className="admin-contact-title">Admin Contact Data</h1>
      <div className="admin-contact-table-container">
        <table className="admin-contact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((curContactData, index) => {
              const { _id, username, email, message } = curContactData;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{message}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteContact(_id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminContact;
