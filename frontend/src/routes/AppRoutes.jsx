import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import PostAd from "../pages/PostAd.jsx";
import Inbox from "../pages/Inbox.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import Chat from "../pages/Chat.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post-ad" element={<PostAd />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/chat/:conversationId" element={<Chat />} />
    </Routes>
  );
}
