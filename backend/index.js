import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import app from "./app.js"


dotenv.config({
    path: "./env"
})


const PORT = process.env.PORT || 8000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            app.res("server is running on PORT", PORT)
        })
            .catch((error) => {
                console.log("Server is not connect", error)
            })
    })