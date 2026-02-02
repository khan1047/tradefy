import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8001/products/${id}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 30 }}>
      <h1>{product.title}</h1>
      <p>Price: ₹ {product.price}</p>
      <p>Seller: {product.seller}</p>

      <button onClick={() => navigate(`/chat/${product.seller}`)}>
        Chat with seller
      </button>

      <br /><br />
      <button onClick={() => navigate("/home")}>← Back</button>
    </div>
  );
}
