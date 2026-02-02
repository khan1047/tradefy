import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    const seller = localStorage.getItem("tradefy_user");

    if (!seller) {
      alert("Login first");
      return navigate("/login");
    }

    try {
   await axios.post("http://127.0.0.1:8001/products/", {
        title,
        price,
        seller,
        image_urls: []
      });

      alert("Product posted successfully!");
      navigate("/home");
    } catch (err) {
      alert("Post failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Post Ad</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br /><br />

      <button onClick={handlePost}>Post</button>
    </div>
  );
}
