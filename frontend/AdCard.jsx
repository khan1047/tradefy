import { Link } from "react-router-dom";

export default function AdCard({ ad }) {
  return (
    <Link to={`/ad/${ad._id}`}>
      <div className="bg-white rounded-lg border hover:shadow-md transition overflow-hidden">
        
        {/* Image */}
        <div className="h-40 bg-gray-200 flex items-center justify-center">
          {ad.images && ad.images.length > 0 ? (
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">No Image</span>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="text-green-600 font-bold text-lg">
            ₹ {ad.price}
          </div>

          <div className="font-medium truncate">
            {ad.title}
          </div>

          <div className="text-xs text-gray-500 capitalize">
            {ad.category}
          </div>
        </div>
      </div>
    </Link>
  );
}
