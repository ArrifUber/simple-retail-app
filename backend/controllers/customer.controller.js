import prisma from "../prisma/client.js"

const getAll = async (req, res) => {
    try {
        const customers = await prisma.customer.findMany()
        res.status(200).json({
            success: true,
            data: customers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }   
}

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const customer = await prisma.customer.findUnique({where: {id}})
        if(!customer){
            return res.status(404).json({
                success: false,
                message: "Customer tidak ditemukan"
            })
        }
        res.status(200).json({
            success: true,
            data: customer
        })
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}


const create = async (req, res) => {
    try {
        const {name, phone} = req.body
        const createdCustomer = await prisma.customer.create({data: {
            name,
            phone
        }})
        if(!createdCustomer){
            return res.status(400).json({
                success: false,
                message: "Gagal membuat customer"
            })
        }
        res.status(201).json({
            success: true,
            message: "Berhasil membuat customer",
            customer: createdCustomer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {name, phone, total_points} = req.body
        const updatedCustomer = await prisma.customer.update({where: {id}, data: {
            name,
            phone,
            totalPoints: total_points
        }})
        if(!updatedCustomer){
            return res.status(400).json({
                success: false,
                message: "Gagal memperbarui customer"
            })
        }
        res.status(200).json({
            success: true,
            message: "Berhasil memperbarui customer",
            customer: updatedCustomer
        })
    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const deletedCustomer = await prisma.customer.delete({where: {id}})
        if(!deletedCustomer){
            return res.status(404).json({
                success: false,
                message: "Gagal menghapus customer"
            })
        }
        res.status(200).json({
            success: true,
            message: "Berhasil menghapus customer"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {getAll, getById, create, update, deleteCustomer}