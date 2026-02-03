import { useEffect, useState } from "react";

export default function AdsFeed() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ads")
      .then(res => res.json())
      .then(data => {
        setAds(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading ads...</p>;

  if (!ads.length) return <p>No ads found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ads.map(ad => (
        <div key={ad._id} className="border p-4 rounded">
          <h3 className="font-bold">{ad.title}</h3>
          <p>{ad.price}</p>
        </div>
      ))}
    </div>
  );
}
