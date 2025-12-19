import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5001/api/ads/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load ad");
        return res.json();
      })
      .then(data => setAd(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!ad) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {ad.images?.length ? (
        <img
          src={ad.images[0]}
          className="w-full h-64 object-cover rounded mb-4"
        />
      ) : (
        <div className="h-64 bg-gray-200 flex items-center justify-center mb-4">
          No Image
        </div>
      )}

      <h1 className="text-2xl font-bold">{ad.title}</h1>
      <p className="text-green-600 text-xl mt-2">₹ {ad.price}</p>
      <p className="text-gray-600">{ad.location}</p>

      <p className="mt-4">{ad.description}</p>

      <p className="text-sm text-gray-500 mt-4">
        Category: {ad.category} · Views: {ad.views}
      </p>
    </div>
  );
}
