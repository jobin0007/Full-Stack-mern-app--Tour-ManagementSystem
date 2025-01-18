import React from "react";

import { AiOutlineDashboard } from "react-icons/ai";
import RoleRequests from "./RoleRequests";
import OtherDuties from "./OtherDuties";
import Tours from "./Tours";

function AdminDashBoard() {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sky-500">
          <AiOutlineDashboard size={28} />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-col lg:flex-row flex-grow gap-4 p-6">
        <section className="flex-grow bg-white shadow-md rounded-lg p-4 space-y-4">
          <RoleRequests />
        </section>
        <section className="flex-grow bg-white shadow-md rounded-lg p-4 space-y-4">
          <Tours />
        </section>
        <section className="flex-grow bg-white shadow-md rounded-lg p-4 space-y-4">
          <OtherDuties />
        </section>
      </main>
      <footer className="bg-white py-4 text-center shadow-md">
        <p className="text-gray-600">© 2025 Admin Dashboard</p>
      </footer>
    </div>
  );
}

export default AdminDashBoard;
