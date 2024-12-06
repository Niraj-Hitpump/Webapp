import User from "../models/user-model.js";
import Contact from "../models/contact-model.js";
 
export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0});
        console.log(users);
        if(!users || users.length===0){
            return res.status(404).json({message:"No users found"});
        }
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

export const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"No contacts found"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error)
    }
}


export const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id; // Extract ID from request params
        const deletedUser = await User.deleteOne({ _id: id }); // Delete user by ID

        if (deletedUser.deletedCount === 0) {
            // No user was deleted
            return res.status(404).json({ message: "User not found" });
        }

        // User was successfully deleted
        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};

export const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id; // Extract ID from request params
        const deletedContact = await Contact.deleteOne({ _id: id }); // Delete contact by ID

        if (deletedContact.deletedCount === 0) {
            // No contact was deleted
            return res.status(404).json({ message: "Contact not found" });
        }

        // Contact was successfully deleted
        res.status(200).json({
            message: "Contact deleted successfully",
        });
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};
// single user logic
// export const getUserById = async (req, res, next) => {
//    try {
//     const id=req.params.id;
//     const data=await User.findOne({_id:id},{password:0});
//     return res.status(200).json(data);
//    } catch (error) {
//     next(error)
//    }
// };
