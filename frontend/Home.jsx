import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import AdCard from "../components/AdCard";

export default function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/ads")
      .then(res => res.json())
      .then(data => {
        setAds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ads fetch error", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Categories */}
      <CategoryBar />

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 mt-10">
          Loading ads...
        </p>
      )}

      {/* Ads Grid */}
      {!loading && ads.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {ads.map(ad => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      )}

      {/* No ads */}
      {!loading && ads.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No ads found.
        </p>
      )}
    </div>
  );
}
