import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostAd() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("mobiles");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("category", category);

    if (image) {
      formData.append("image", image); // ✅ MUST be "image"
    }

    try {
      const res = await fetch("http://localhost:5001/api/ads", {
        method: "POST",
        body: formData, // ❌ NO headers
      });

      const data = await res.json();
      console.log("Ad created:", data);

      alert("Ad posted successfully");
      navigate("/");
    } catch (err) {
      console.error("Post ad error", err);
      alert("Failed to post ad");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Post New Ad</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option value="mobiles">Mobiles</option>
          <option value="cars">Cars</option>
          <option value="jobs">Jobs</option>
          <option value="properties">Properties</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Ad
        </button>
      </form>
    </div>
  );
}
