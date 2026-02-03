#!/usr/bin/env bash
set -e

echo "🚀 PyGPT MVP Builder: Ads Feed Phase 1"

DATE=$(date +"%Y-%m-%d")

# --- BACKEND ---

mkdir -p backend/routes backend/controllers

ADS_ROUTE="backend/routes/ads.js"
ADS_CONTROLLER="backend/controllers/adsController.js"

if [ ! -f "$ADS_ROUTE" ]; then
cat > "$ADS_ROUTE" <<'EOF'
import express from "express";
import { listAds } from "../controllers/adsController.js";

const router = express.Router();

router.get("/", listAds);

export default router;
EOF
fi

if [ ! -f "$ADS_CONTROLLER" ]; then
cat > "$ADS_CONTROLLER" <<'EOF'
import Ad from "../models/Ad.js";

export async function listAds(req, res) {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "20");

  const ads = await Ad.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ page, limit, data: ads });
}
EOF
fi

# --- FRONTEND ---

mkdir -p frontend/src/pages

FEED_PAGE="frontend/src/pages/AdsFeed.jsx"

if [ ! -f "$FEED_PAGE" ]; then
cat > "$FEED_PAGE" <<'EOF'
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
EOF
fi

echo "✅ MVP Ads feed scaffolding generated."

# --- MODEL ---

ADS_MODEL="backend/models/Ad.js"

if [ ! -f "$ADS_MODEL" ]; then
cat > "$ADS_MODEL" <<'EOF'
import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    category: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Ad", AdSchema);
EOF
fi

# --- REGISTER ROUTE ---

SERVER_FILE="backend/server.js"

if ! grep -q "adsRoutes" "$SERVER_FILE"; then
  sed -i '/express()/a \
import adsRoutes from "./routes/ads.js";' "$SERVER_FILE"

  sed -i '/app.use(/a \
app.use("/api/ads", adsRoutes);' "$SERVER_FILE"
fi

echo "🧠 Ads model + route registration applied."
