import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("Raw Authorization header:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    try {
        // Remove "Bearer " prefix and trim the token
        const jwtToken = token.replace("Bearer ", "").trim();
        console.log("Token after formatting:", jwtToken);

        // Decode and log the token for debugging
        const decodedToken = jwt.decode(jwtToken, { complete: true });
        console.log("Decoded Token:", decodedToken);

        // Verify the token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("Token verified:", isVerified);

        // Retrieve user data based on email
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
        console.log("User data found:", userData);

        if (!userData) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach user data to the request
        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export default authMiddleware;
