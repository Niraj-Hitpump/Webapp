

export const adminMiddleware = (req, res, next) => {
    try {
        console.log(req.user);
        const adminRole=req.user.isAdmin;
        if(!adminRole){
            return res.status(401).json({message:"Access Denied , User is not an admin"});
        } 
        next();                                                                
    } catch (error) {
        next(error)
    }
};                                                  