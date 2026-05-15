import express from "express"
import tokenMiddleware from "../middleware/auth.middleware.js"
import { create, deleteSupplier, getAll, getById, update } from "../controllers/supplier.controller.js"

const router = express.Router()
router.use(tokenMiddleware)

router.get("/", getAll)
router.get("/:id", getById)
router.post("/", create)
router.put("/:id", update)
router.delete("/:id", deleteSupplier)

export default router