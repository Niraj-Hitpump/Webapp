import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Service from "./Pages/Service.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Error from "./Pages/Error.jsx";
import Logout from "./Pages/Logout.jsx";
import AdminLayout from "./Components/layouts/AdminLayout.jsx";
import AdminUsers from "./Pages/AdminUsers.jsx";
import AdminContact from "./Pages/AdminContact.jsx";
import AdminServices from "./Pages/AdminServices.jsx";
import AdminHome from "./Pages/AdminHome.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Error />} />

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="contacts" element={<AdminContact />} />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="home" element={<AdminHome />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default App;
