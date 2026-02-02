import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/product.api";
import { getCategories } from "../api/category.api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

useEffect(() => {
  setPage(1);
}, [search]);

useEffect(() => {
  loadCategories();
  loadProducts();
}, [search, page]);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

const loadProducts = async () => {
  const res = await getProducts({
    search,
    page,
    limit,
  });
  setProducts(res.data.items);
  setTotal(res.data.total);
};

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    loadProducts(value);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
<input
  type="text"
  placeholder="Search ads..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: 8,
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  }}
/>
{products.map((p) => (
  <div
    key={p.id}
    onClick={() => navigate(`/product/${p.id}`)}
    style={{
      border: "1px solid #ccc",
      padding: 12,
      marginBottom: 10,
      cursor: "pointer",
    }}
  >
    <h3>{p.title}</h3>

    <p>₹ {p.price}</p>

    <p>
      Seller: <strong>{p.seller?.email}</strong>
    </p>

    {p.category && (
      <p>
        Category: <em>{p.category.name}</em>
      </p>
    )}
  </div>
))}

<div style={{ marginTop: 20 }}>
  <button
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
  >
    Prev
  </button>

  <span style={{ margin: "0 10px" }}>
    Page {page}
  </span>

<button
  onClick={() => setPage((p) => p + 1)}
  disabled={page * limit >= total}
>
  Next
</button>
</div>
      </div>
    </div>
  );
}
