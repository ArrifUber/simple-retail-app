import prisma from "../prisma/client.js"

const getAll = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                user: {select: {
                    id: true,
                    username: true,
                    role: true
                }},
                customer: true,
                transactionItems: {
                    include: {
                        product: true
                    }
                }
            }
        })
        res.status(200).json({
            success: true,
            data: transactions 
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.body)
    const { customer_id, total, transaction_items } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          userId,
          customerId: customer_id,
          total,
        },
      });

      await Promise.all(
        transaction_items.map((item) => {
          return tx.transactionItem.create({
            data: {
              transactionId: transaction.id,
              productId: item.product_id,
              quantity: item.quantity,
              price: item.price,
            },
          });
        }),
      );

      await Promise.all(
        transaction_items.map((item) => {
          return tx.product.update({
            where: { id: item.product_id },
            data: { stock: { decrement: item.quantity } },
          });
        }),
      );

      return transaction;
    });

    return res.status(201).json({
      success: true,
      message: "transaksi berhasil dibuat",
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {getAll, checkout}