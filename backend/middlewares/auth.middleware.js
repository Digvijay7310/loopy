import jwt from 'jsonwebtoken'

export const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization?.split("")[1];
    if (!token) return next(new ApiError(401, "Unauthorized"))
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return next(new ApiError(403, "Invlaid or expire ACCESS TOKEN"))
    }
}