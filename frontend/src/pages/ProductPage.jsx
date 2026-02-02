import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const currentUserEmail = localStorage.getItem("tradefy_user");

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line
  }, []);

  const loadProduct = async () => {
    try {
      const res = await axiosClient.get(`/products/${id}`);
      setProduct(res.data);

      if (res.data.images && res.data.images.length > 0) {
        setSelectedImage(res.data.images[0].url);
      }
    } catch (err) {
      alert("Failed to load product");
    }
  };

const handleMessageSeller = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    // Check if conversation already exists
    const res = await axiosClient.get(
      `/messages/conversation/${product.id}`
    );

    // If no messages, send initial message
    if (res.data.length === 0) {
      await axiosClient.post("/messages/send", {
        product_id: product.id,
        content: "Is this still available?",
      });
    }

    // Always navigate to chat
    navigate(`/chat/${product.id}`);
  } catch (err) {
    console.error(err);
    alert("Failed to start conversation");
  }
};

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <button onClick={() => navigate("/home")} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      <h2 style={{ marginBottom: 10 }}>{product.title}</h2>

      {/* MAIN IMAGE */}
      {selectedImage && (
        <img
          src={`http://127.0.0.1:8001${selectedImage}`}
          alt="main"
          style={{
            width: "100%",
            maxWidth: 600,
            height: 350,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #ddd",
            marginBottom: 12,
          }}
        />
      )}

      {/* THUMBNAILS */}
      {product.images && product.images.length > 1 && (
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={`http://127.0.0.1:8001${img.url}`}
              alt="thumb"
              onClick={() => setSelectedImage(img.url)}
              style={{
                width: 90,
                height: 65,
                objectFit: "cover",
                borderRadius: 4,
                cursor: "pointer",
                border:
                  selectedImage === img.url
                    ? "2px solid #2563eb"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>
      )}

      <p style={{ fontSize: 20, fontWeight: "bold" }}>
        ₹ {product.price}
      </p>

      {/* MESSAGE SELLER (hidden for owner) */}
      {product.seller?.email !== currentUserEmail && (
        <button
          onClick={handleMessageSeller}
          style={{
            marginTop: 20,
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Message Seller
        </button>
      )}

      <p style={{ marginTop: 20 }}>
        Seller: <strong>{product.seller?.email}</strong>
      </p>

      {product.category && (
        <p>
          Category: <em>{product.category.name}</em>
        </p>
      )}
    </div>
  );
}
