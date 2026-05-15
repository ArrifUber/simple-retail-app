import prisma from "../prisma/client.js";

const getAll = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).json({
      success: true,
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const supplier = await prisma.supplier.findUnique({where: {id}})
    if(!supplier){
        return res.status(404).json({
            success: false,
            message: "Supplier tidak ditemukan"
        })
    }
    res.status(200).json({
        success: true,
        data: supplier
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const newSupplier = await prisma.supplier.create({
      data: {
        address,
        name,
        phone,
      },
    });
    if (!newSupplier) {
      return res.status(400).json({
        success: false,
        message: "Gagal menambahkan supplier",
      });
    }
    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan supplier",
      supplier: newSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, address, phone } = req.body;
    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        name,
        address,
        phone,
      },
    });

    if (!updatedSupplier) {
      return res.status(404).json({
        success: false,
        message: "Gagal memperbarui supplier",
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil memperbarui supplier",
      supplier: updatedSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedSupplier = await prisma.supplier.delete({ where: { id } });
    if (!deletedSupplier) {
      return res.status(404).json({
        success: false,
        message: "Gagal menghapus supplier",
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil menghapus supplier",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAll, create, update, deleteSupplier, getById };
