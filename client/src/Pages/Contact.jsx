// import { useState } from "react";
// import { useAuth } from "../store/auth";

// const Contact = () => {
//     const [user, setUser] = useState({
//         username: "",
//         email: "",
//         message: "",
//     });

//     const [userData, setUserData] = useState(true);

//     const {userContact}=useAuth();
//     if(userData && userContact){
//         setUserData({
//             username:userContact.username,
//             email:userContact.email,
//             message:"",
//         });
//         setUserData(false);
//     }

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form submitted:", user); // Avoid logging the synthetic event directly
//     };

//     return (
//         <div>
//             <section className="section-hero">
//                 <div className="container grid grid-two-cols">
//                     {/* Hero images */}
//                     <div className="hero-image">
//                         <img
//                             src="/images/network.png"
//                             alt="contact us"
//                             width="400"
//                             height="500"
//                         />
//                     </div>

//                     <div className="hero-content">
//                         <div>
//                             <h1>Contact Us</h1>
//                             <p>
//                                 If you have any questions or need assistance,
//                                 please feel free to contact us. We are here to
//                                 help!
//                             </p>
//                             <form onSubmit={handleSubmit}>
//                                 <label htmlFor="username">Username</label>
//                                 <input
//                                     type="text"
//                                     id="username"
//                                     placeholder="Enter your name"
//                                     required
//                                     name="username"
//                                     value={user.username}
//                                     onChange={handleInput}
//                                 />
//                                 <label htmlFor="email">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     placeholder="Enter your email"
//                                     required
//                                     name="email"
//                                     value={user.email}
//                                     onChange={handleInput}
//                                 />
//                                 <label htmlFor="message">Message</label>
//                                 <textarea
//                                     id="message"
//                                     cols="30"
//                                     rows="10"
//                                     placeholder="Enter your message"
//                                     required
//                                     name="message"
//                                     value={user.message}
//                                     onChange={handleInput}
//                                 ></textarea>
//                                 <button type="submit">Send Message</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Full-screen map section */}
//             <section className="map-section">
//                 <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1723.2490105539055!2d77.04442939839478!3d30.251388300000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fad2d69058e33%3A0xc7d016db25112762!2sMaharishi%20Markandeshwar%20(Deemed%20to%20be%20University)!5e0!3m2!1sen!2sin!4v1733051721922!5m2!1sen!2sin"
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         border: 0,
//                     }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                 ></iframe>
//             </section>
//         </div>
//     );
// };

// export default Contact;


// changing for contact auto updation otherwise it was ok
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

const defaultContactFormData={
    username: "",
    email: "",
    message: "",
}

const Contact = () => {
    const [user, setUser] = useState(defaultContactFormData);

    const { user: authData } = useAuth(); // Access user data from AuthContext

    useEffect(() => {
        // Update form fields when authData is available
        if (authData?.userData) {
            const { username, email } = authData.userData;
            setUser((prevUser) => ({
                ...prevUser,
                username: username || "",
                email: email || "",
            }));
        }
    }, [authData]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };


    // handle form getformsubmission info message
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:4000/api/form/contact", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 201) {
                setUser(defaultContactFormData);
                toast.success("Message sent successfully!");
            } else {
                toast.error("Failed to send the message. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error("Failed to send the message. Please try again.");
        }
    };
    
    
    
    
    return (
        <div>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* Hero images */}
                    <div className="hero-image">
                        <img
                            src="/images/network.png"
                            alt="contact us"
                            width="400"
                            height="500"
                        />
                    </div>

                    <div className="hero-content">
                        <div>
                            <h1>Contact Us</h1>
                            <p>
                                If you have any questions or need assistance,
                                please feel free to contact us. We are here to
                                help!
                            </p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your name"
                                    required
                                    name="username"
                                    value={user.username}
                                    onChange={handleInput}
                                />
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    cols="30"
                                    rows="10"
                                    placeholder="Enter your message"
                                    required
                                    name="message"
                                    value={user.message}
                                    onChange={handleInput}
                                ></textarea>
                                <button type="submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full-screen map section */}
            <section className="map-section">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1723.2490105539055!2d77.04442939839478!3d30.251388300000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fad2d69058e33%3A0xc7d016db25112762!2sMaharishi%20Markandeshwar%20(Deemed%20to%20be%20University)!5e0!3m2!1sen!2sin!4v1733051721922!5m2!1sen!2sin"
                    style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;
