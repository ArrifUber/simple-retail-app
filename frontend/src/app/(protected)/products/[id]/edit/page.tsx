"use client";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const EditPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    barcode: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const product = await api.get(`/products/${id}`);
        console.log(product.data.data);
        setForm({
          name: product.data.data.name,
          price: product.data.data.price,
          stock: product.data.data.stock,
          barcode:
            product.data.data.barcode === null ? "" : product.data.data.barcode,
        });
      } catch (error) {
        console.error("Tejadi error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await api.put(`/products/${id}`, {
        ...form,
        barcode: form.barcode === "" ? null : form.barcode,
      });
      router.push('/products')
    } catch (error) {
        console.error("Terjadi error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="w-full py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold">Update Products {id}</h1>
            </div>
            <div className="mx-auto">
              <form
                className="border p-8 rounded-lg flex flex-col gap-4 w-150"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <span className="flex flex-col gap-2">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="border px-4 py-1 rounded"
                      placeholder="Your product name..."
                      value={form.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </span>
                  <span className="flex flex-col gap-2">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="border px-4 py-1 rounded"
                      placeholder="Product price..."
                      value={form.price}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </span>
                  <span className="flex flex-col gap-2">
                    <label htmlFor="stock">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      className="border px-4 py-1 rounded"
                      placeholder="Product stock..."
                      value={form.stock}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </span>
                  <span className="flex flex-col gap-2">
                    <label htmlFor="barcode">barcode</label>
                    <input
                      type="text"
                      name="barcode"
                      id="barcode"
                      className="border px-4 py-1 rounded"
                      placeholder="Product barcode..."
                      value={form.barcode}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </span>
                </div>
                <button
                  className="cursor-pointer bg-orange-300 px-4 rounded py-1 hover:opacity-80"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Update Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditPage;
