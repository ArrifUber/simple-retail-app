import express from "express"
import tokenMiddleware from "../middleware/auth.middleware.js"
import { create, deleteCustomer, getAll, getById, update } from "../controllers/customer.controller.js"

const router = express.Router()

router.use(tokenMiddleware)


router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', deleteCustomer)


export default router