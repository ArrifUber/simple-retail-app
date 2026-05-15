import express from "express"
import tokenMiddleware from "../middleware/auth.middleware.js"
import { getAll, checkout } from "../controllers/transaction.controller.js"


const router = express.Router()

router.use(tokenMiddleware)

router.get('/', getAll)
router.post('/checkout', checkout)


export default router