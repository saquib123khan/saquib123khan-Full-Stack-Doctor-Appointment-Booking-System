import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import adminRouter from './routes/admin.route.js'
import errorMiddleware from './middlewares/error.middleware.js'
import connectionToDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/user.route.js';

// app config
const app = express()
const PORT = process.env.PORT || 5000
connectionToDB ()

// middlewares
app.use(express.json())
app.use(cors())
connectCloudinary()

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req,res)=>{
    res.send('API working')
})

app.use(errorMiddleware)

app.listen(PORT, ()=> {
    console.log(`server is running on port http:localhost:${PORT}`);
})