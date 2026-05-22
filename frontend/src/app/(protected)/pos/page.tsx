"use client";
import api from "@/lib/api";
import { CartItem } from "@/types";
import { useState } from "react";

const PosPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0) 

  const handelSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(barcode);
      const response = await api.get(`/products/barcode/${barcode}`);
      const { id, name, price } = response.data.product;
      const checkProduct = cart.find((p) => p.id === id);
      const data: CartItem = {
        id,
        name,
        price,
        quantity: 1,
      };
      if (checkProduct) {
        const updatedQuantity = checkProduct.quantity + 1;
        setCart((prevProduct) =>
          prevProduct.map((product) =>
            product.id === id
              ? { ...product, quantity: updatedQuantity }
              : product,
          ),
        );
      } else {
        setCart([...cart, data]);
      }
    } catch (error) {
      console.error("Terjadi error: ", error);
    } finally {
      setBarcode('')
      setLoading(false);
    }
  };


  const handleCheckout = async () => {
    try {
      if(cart.length === 0){
        return
      }
      const confirm = window.confirm("Apakah anda yakin ingin melakukan checkout?")
      if(!confirm){
        return
      }
      setLoading(true)
      const data = {
        customer_id: null,
        total,
        transaction_items: cart.map(product => ({
          product_id: product.id,
          quantity: product.quantity,
          price: product.price
        }))
      }
      console.log(data)
      await api.post('/transaction/checkout', data)
      alert('transaction telah tercatat')
      setCart([])
    } catch (error) {
      console.error('terjadi error: ', error)
    } finally {
      console.log('jalan')
      setLoading(false)
    }
  }
  return (
    <>
      <section className="w-full py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold mb-6">POS Page</h1>
          <div className="grid grid-cols-2 gap-6 px-4">
            <div className="border rounded p-6">
              <h2 className="text-lg font-bold mb-4">Input Barcode</h2>
              <form
                className="flex p-4 gap-4 items-center"
                onSubmit={handelSubmit}
              >
                <label htmlFor="barcode" className="font-bold">
                  Barcode
                </label>
                <input
                  type="text"
                  name="barcode"
                  id="barcode"
                  className="border px-4 py-1 rounded"
                  placeholder="Barcode Product"
                  onChange={(e) => setBarcode(e.target.value)}
                  value={barcode}
                />
                <button
                  type="submit"
                  className="px-4 py-1 border rounded bg-green-300 cursor-pointer hover:opacity-80"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "+ Add"}
                </button>
              </form>
            </div>
            <div className="border rounded p-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Product Cart</h2>
              <div className="flex flex-col gap-2">
                <div className="border rounded p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Product Name</h3>
                    <p>Rp 20.000 / product</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">X4</p>
                  </div>
                </div>

                {cart.map((product) => {
                  return (
                    <div
                      className="border rounded p-4 flex justify-between items-center"
                      key={product.id}
                    >
                      <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <p>{product.price} / product</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">X{product.quantity}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="border rounded p-4 flex justify-between">
                  <p className="text-lg font-bold">Total Price:</p>
                  <p className="text-lg">Rp 500.000 {total}</p>
                </div>
              </div>
            </div>
          </div>
          <button className="px-4 py-1 bg-orange-300 rounded hover:opacity-80 cursor-pointer mt-4" disabled={loading} onClick={handleCheckout}>{loading ? "Loading..." : "Checkout"}</button>
        </div>
      </section>
    </>
  );
};

export default PosPage;
