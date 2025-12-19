import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();   
  const [ad, setAd] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/ads/${id}`)
      .then(res => res.json())
      .then(data => setAd(data))
      .catch(err => console.error("Ad fetch error", err));
  }, [id]);

  if (!ad) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Image */}
      {ad.images?.length > 0 ? (
        <img
          src={ad.images[0]}
          alt={ad.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      ) : (
        <div className="h-64 bg-gray-200 flex items-center justify-center mb-4">
          No Image
        </div>
      )}

      {/* Info */}
      <h1 className="text-2xl font-bold">{ad.title}</h1>
      <p className="text-green-600 text-xl mt-2">₹ {ad.price}</p>
      <p className="text-gray-600 mt-1">{ad.location}</p>
      <p className="mt-4">{ad.description}</p>

      <p className="text-sm text-gray-500 mt-4">
        Category: {ad.category} · Views: {ad.views}
      </p>
      <button
        onClick={() => navigate(`/chat/${ad._id}`)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Chat with Seller
      </button>
    </div>
  );
}
