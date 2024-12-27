import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { useAuth } from "../store/auth";

const Register = () => {
    const{url}=useAuth();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const navigate=useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/auth/register`, user, {
                withCredentials: true,
            });
            console.log("Response Data:", response.data);
             // Clear the form after successful submission
             setUser({
                username: "",
                email: "",
                phone: "",
                password: "",
            });
            toast.success("Registration successful");
            navigate('/login')
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An error occurred during Register.";
            console.error("Registration error:", errorMessage);
            toast.error(errorMessage);
        }
    };
    
    
    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image reg-img">
                            <img
                                src="/images/register.png"
                                alt="registration"
                                width="400"
                                height="500"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleInput}
                                        placeholder="username"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        placeholder="email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text" // Change to "text" to allow formatting like dashes
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleInput}
                                        placeholder="phone"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInput}
                                        placeholder="password"
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Register Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Register;
