import { useEffect, useState } from "react";

export default function CategoryBar({ selectedCategory, onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Category fetch error", err));
  }, []);

  return (
    <div className="flex gap-4 p-3 overflow-x-auto border-b">
      {categories.map(cat => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === cat.slug
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
