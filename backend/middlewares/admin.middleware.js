import apiError from "../utils/apiError.js"

 const isAdmin = (req, res, next) => {
    if(!req.user?.role !== "admin"){
        return next(apiError(401, "Admins only"))
    }
}

export default isAdmin;