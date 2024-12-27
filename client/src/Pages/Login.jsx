import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {
    const {url}=useAuth();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { storeTokenInLS } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    // handle form on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            const response = await axios.post(
                `${url}/api/auth/login`,
                user,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200 && response.data.token) {
                const { token } = response.data;
                console.log("Login successful:", response.data);
                toast.success("Login successful");
                storeTokenInLS(token);
                setUser({ email: "", password: "" });
                navigate("/");
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An error occurred during login.";
            console.error("Login error:", errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image reg-img">
                                <img
                                    src="/images/login.png"
                                    alt="login"
                                    width="400"
                                    height="500"
                                />
                            </div>
                            {/* our main logincode  */}
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">
                                    Login form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            placeholder="email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">
                                            password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            placeholder="password"
                                        />
                                    </div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                    >
                                        Login now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Login;
