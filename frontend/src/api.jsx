import { useEffect, useState } from "react";
import { getProducts } from "./api";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>TradeFy Marketplace</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {products.map((p) => {
          const img =
            typeof p.images?.[0] === "string"
              ? `http://127.0.0.1:8001${p.images[0]}`
              : p.images?.[0]?.url;

          return (
            <div key={p.id} style={{ border: "1px solid #ddd", padding: 20 }}>
              <h3>{p.title}</h3>
              <p>₹ {p.price}</p>
              {img && <img src={img} width="200" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
