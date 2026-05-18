"use client";
import api from "@/lib/api";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [data, setData] = useState({
        products: 0,
        transactions: 0,
        customers: 0,
        suppliers: 0
    })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const a = await Promise.all([
          api.get("/products"),
          api.get("/transaction"),
          api.get("/customer"),
          api.get("/supplier"),
        ]);
        setData({
            products: a[0].data.data.length,
            transactions: a[0].data.data.length,
            customers: a[0].data.data.length,
            suppliers: a[0].data.data.length
        })
      } catch (error) {
        console.error("Terjadi error: ", error)
      } finally {
        setLoading(false)
      }
    };
    getData();
  }, []);
  return (
    <>
    <section className="w-full py-16 ">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col gap-2 p-2 border rounded-sm">
                <h2>Total Produk</h2>
                {loading ? <p>Loading</p> : <p>{data.products}</p>}
                </div>
                <div className="flex flex-col gap-2 p-2 border rounded-sm">
                <h2>Total Transaction</h2>
                {loading ? <p>Loading</p> : <p>{data.transactions}</p>}
                </div>
                <div className="flex flex-col gap-2 p-2 border rounded-sm">
                <h2>Total Customer</h2>
                {loading ? <p>Loading</p> : <p>{data.customers}</p>}
                </div>
                <div className="flex flex-col gap-2 p-2 border rounded-sm">
                <h2>Total Supplier</h2>
                {loading ? <p>Loading</p> : <p>{data.suppliers}</p>}
                </div>
            </div>

        </div>

    </section>
    </>
  );
};

export default DashboardPage;
