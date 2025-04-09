import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userName = "User" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-lg border-b border-gray-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between">
      {/* Logo/Title */}
      <div className="text-2xl font-bold text-blue-600 mb-2 sm:mb-0">
        QuoteGen
      </div>

      {/* Avatar and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar size="large" icon={<UserOutlined />} />
          <span className="text-gray-700 font-medium hidden sm:inline">
            Hi, {userName}
          </span>
        </div>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
