import React from "react";
import PolicyForm from "../components/policy-form";

const Policies = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Generate Policy</h1>
      <PolicyForm />
    </div>
  );
};

export default Policies;
