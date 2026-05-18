"use client";
import api from "@/lib/api";
import { Product } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products");
        setProducts(response.data.data);
      } catch (error) {
        setError(true);
        console.error("Terjadi error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
        const confirm = window.confirm("Apakah anda yakin ingin mengapus product tersebut?")
        if(confirm){
            await api.delete(`/products/${id}`)
            setProducts(products.filter(product => product.id !== id))
        }
    } catch (error) {
      console.error("Terjadi error: ", error);
    }
  };

  console.log(products);
  return (
    <>
      <section className="w-full py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">List Product</h1>
              <Link
                className="cursor-pointer border p-2 rounded-md bg-green-200 hover:opacity-80"
                href={"/products/create"}
              >
                + Add Products
              </Link>
            </div>

            <div className="px-4 grid grid-cols-4 gap-4">
              {error && (
                <p className="text-red-500">
                  Terjadi kesalahan saat mengambil data
                </p>
              )}
              {loading && <p>Loading...</p>}
              {products.map((product) => {
                const formattedPrice = product.price.toLocaleString("id-ID");
                return (
                  <div
                    className="border p-2 rounded flex flex-col gap-2 flex-wrap"
                    key={product.id}
                  >
                    <div>
                      <h2 className="text-lg font-bold">{product.name}</h2>
                      <p>Rp {formattedPrice}</p>
                      <p>Stock: {product.stock}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button className="cursor-pointer border px-4 rounded bg-red-200 hover:opacity-80" onClick={() => handleDelete(product.id)}>
                        Hapus
                      </button>
                      <Link
                        href={`/products/${product.id}/edit`}
                        className="cursor-pointer border px-4 rounded bg-orange-200 hover:opacity-80"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
