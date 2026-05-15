import tokenMiddleware  from '../middleware/auth.middleware.js'
import express from 'express'
import { create, deleteProduct, getAll, getByBarcode, getById, update } from "../controllers/product.controller.js"
const router = express.Router()

router.use(tokenMiddleware)

router.get('/', getAll)
router.get('/barcode/:barcode', getByBarcode)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', deleteProduct)

export default router