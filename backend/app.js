import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import userRoutes from './routes/user.routes.js'

const app = express()


// import middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))

//Middlewares
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.json({ limit: "16kb" }))
app.use((err, res, req, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        message,
        ...app(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
})

//Static file serving
app.use("/public", express.static("public"))




app.use("/api/v1/users", userRoutes)

export default app