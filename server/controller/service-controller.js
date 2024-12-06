import {service} from "../models/service-model.js";


const services = async (req, res) => {
    try {
        const response=await service.find();
        if(!response){
            res.status(404).json({message:"No services found"});
            return;
        }

        res.status(200).json(response);

    } catch (error) {
        console.log(`services: ${error}`);
    }
}
export default services