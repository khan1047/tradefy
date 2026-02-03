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
