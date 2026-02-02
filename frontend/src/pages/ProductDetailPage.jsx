import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => alert("Failed to load product"));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{product.title}</h1>
      <h3>₹ {product.price}</h3>
      <p>Seller: {product.seller}</p>

      {product.images?.map((img, i) => (
        <img
          key={i}
          src={img}
          width={200}
          style={{ marginRight: 10 }}
        />
      ))}

      <br /><br />
      <button onClick={() => navigate(`/chat/${product.seller}`)}>
        Chat with seller
      </button>
    </div>
  );
}
