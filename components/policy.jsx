import React from "react";
import "tailwindcss/tailwind.css";
import policies from "@/data/policies";
import Link from "next/link";

const Policy = () => {
  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Policy Templates</h2>
      {policies.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-white shadow rounded-lg p-4">
              <h1 className="text-xl font-bold mb-2">{policy.fileName}</h1>
              <p className="text-gray-700 text-base mb-2">{policy.desc}</p>
              <Link
                className="text-blue-500 border p-2 hover:underline"
                href={`${policy.titleQuery}`}
              >
                Generate Policy
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Policy;
