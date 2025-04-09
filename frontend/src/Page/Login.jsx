// src/Page/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
      messageApi.open({
        type: "success",
        content: "Login successful!",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      messageApi.open({
        type: "error",
        content: "Invalid Login details",
      });
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-10 gap-30">
      {contextHolder}
      {/* Brand title and paragraph */}
      <div className="text-center mb-10 flex items-center flex-col gap-5">
        <h1 className="text-4xl font-bold text-gray-800">QuoteGen</h1>
        <p className="mt-2 text-gray-600 text-sm max-w-md mx-auto">
          Create stunning product quotes effortlessly. Upload items, customize
          layouts, and export polished PDFs in seconds. Built for teams and
          freelancers.
        </p>
        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-12">
          Powered by <span className="font-medium text-blue-500">Webifii</span>
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
