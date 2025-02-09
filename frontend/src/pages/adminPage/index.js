import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdCreateNewFolder, MdDashboard } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneAdminAPI } from "../../services/adminServices";
import Tour from "./Tours";

function AdminDashBoard() {
  const { id: adminId } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", adminId],
    queryFn: () => getOneAdminAPI(adminId),
  });

  const adminFound = data?.adminFound || {}; // Handle undefined data

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <button onClick={() => setShowSidebar(true)} className="text-2xl">
          <AiOutlineMenu />
        </button>
        <div className="flex items-center gap-4">
          <AiOutlineHome className="text-lg" />
          <span>Home</span>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800">
            <AiOutlineLogout className="text-lg" /> Logout
          </button>
          <div className="flex items-center gap-2">
            <AiOutlineUser className="text-lg" />
            <span>{adminFound?.name || "Loading..."}</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-64 p-4 shadow-lg h-full relative">
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-2 right-2 text-2xl"
            >
              <AiOutlineClose />
            </button>
            <nav className="mt-10 space-y-4">
              <Link
                to={`/admin/${adminId}/role-requset`}
                className="flex items-center gap-2 hover:text-indigo-600"
              >
                <MdCreateNewFolder /> Get all role request
              </Link>
              <Link
                to={`/admin/${adminId}/get-All-users`}
                className="flex items-center gap-2 hover:text-indigo-600"
              >
                <MdCreateNewFolder /> Manage Users
              </Link>
              <Link
                to={`/admin/${adminId}/get-All-tour-operators`}
                className="flex items-center gap-2 hover:text-indigo-600"
              >
                <MdCreateNewFolder /> Manage Tour-operators
              </Link>
            </nav>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold py-6 text-center bg-white shadow-md rounded-lg">
          <MdDashboard className="mr-2" /> Admin Dashboard
        </h1>
        {isLoading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">Failed to load data.</p>
        ) : (
          <section className="bg-white shadow-md rounded-lg p-4">
            <Tour />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 text-center shadow-md">
        <p className="text-gray-600">© 2025 Admin Dashboard</p>
      </footer>
    </div>
  );
}

export default AdminDashBoard;