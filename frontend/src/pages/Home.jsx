import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import AdCard from "../components/AdCard";

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/ads")
      .then((res) => res.json())
      .then((data) => setAds(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      {/* Categories */}
      <CategoryBar />

      <h2 className="text-xl font-semibold mt-4 mb-4">Latest Ads</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
