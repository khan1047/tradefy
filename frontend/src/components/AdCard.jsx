import { Link } from "react-router-dom";

export default function AdCard({ ad }) {
  return (
    <Link to={`/ad/${ad._id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
        {/* Image */}
        <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
          {ad.images && ad.images.length > 0 ? (
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          ) : (
            "No Image"
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="text-green-600 font-bold">₹ {ad.price}</div>
          <div className="font-medium truncate">{ad.title}</div>
          <div className="text-sm text-gray-500">{ad.category}</div>
        </div>
      </div>
    </Link>
  );
}
