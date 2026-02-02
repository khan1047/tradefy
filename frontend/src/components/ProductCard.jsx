import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        border: "1px solid #ccc",
        padding: 15,
        marginBottom: 10,
        cursor: "pointer",
      }}
    >
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>
      <small>Seller: {product.seller}</small>
    </div>
  );
}
