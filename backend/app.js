import express from "express"
import dotenv from "dotenv"
import productRoutes from "./routes/product.routes.js"
import authRoutes from "./routes/auth.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import supplierRoutes from "./routes/supplier.routes.js"
import customerRoutes from "./routes/customer.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/supplier', supplierRoutes)
app.use('/api/customer', customerRoutes)

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`)
})
