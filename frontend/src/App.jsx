import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PostAd from "./pages/PostAd.jsx";
import AdDetails from "./pages/AdDetails.jsx";
import Chat from "./pages/Chat.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post-ad" element={<PostAd />} />
      <Route path="/ad/:id" element={<AdDetails />} />
      <Route path="/chat/:adId" element={<Chat />} />
   
    </Routes>
  );
}
