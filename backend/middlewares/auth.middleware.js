import jwt from 'jsonwebtoken'
import apiError from '../utils/apiError.js';

export const verifyJwt = (req, res, next) => {
    const token = req.cookies?.accessToken;

    console.log("Access token:", token)
    if (!token) return next(new apiError(401, "Unauthorized, token missing"))
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error("JWT verification error ", error)
        return next(new apiError(403, "Invlaid or expire ACCESS TOKEN"))
    }
}