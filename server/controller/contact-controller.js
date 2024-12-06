import Contact from "../models/contact-model.js";

export const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        const contactCreated = await Contact.create({ username, email, message });
        res.status(201).json({ message: "Contact created successfully" });
    } catch (error) {
        res.status(500).json({ "Internal Server Error": error.message });
    }
};