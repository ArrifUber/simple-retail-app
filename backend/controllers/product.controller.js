import prisma from "../prisma/client.js";

const getAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({
      success: true,
      data: products,
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
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getByBarcode = async (req, res) => {
  try {
    const barcode = req.params.barcode
    const product = await prisma.product.findUnique({where: {barcode}})  
    if(!product){
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan"
      })
    }
    res.status(200).json({
      success: true,
      product
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
    const { name, price, stock, barcode } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        stock,
        barcode
      },
    });

    if (!newProduct) {
      res.status(400).json({
        success: false,
        message: "Produk gagal ditambahkan",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Produk berhasil ditambahkan",
        product: newProduct,
      });
    }
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
    const { name, price, stock } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        stock        
      },
    });
    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Gagal memperbarui produk",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Produk berhasil diperbarui",
        product: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedProduct = await prisma.product.delete({where: {id}});
    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Gagal menghapus  product",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "berhasil menghapus produk",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAll, getById, create, update, deleteProduct, getByBarcode };
