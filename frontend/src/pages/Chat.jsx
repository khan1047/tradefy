import { useParams } from "react-router-dom";

export default function Chat() {
  const { adId } = useParams();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <p>Chat coming soon for Ad ID: {adId}</p>
    </div>
  );
}
