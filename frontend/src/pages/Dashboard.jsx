import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import AdCard from "../components/AdCard";

export default function Dashboard() {
  const [ads, setAds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost:5001/api/ads?category=${selectedCategory}`
      : "http://localhost:5001/api/ads";

    fetch(url)
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error("Ads fetch error", err));
  }, [selectedCategory]);

  return (
    <div>
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <h2 className="text-xl font-semibold px-4 pt-4">Latest Ads</h2>

      {ads.length === 0 ? (
        <p className="px-4 text-gray-500 mt-2">No ads found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {ads.map(ad => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}
