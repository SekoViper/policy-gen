import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function PolicyForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    if (name.length <= 2) {
      toast.error("Please enter a valid name.");
      return;
    }

    try {
      const response = await fetch(
        `/api/generatePolicyDocument?templateName=${router.query.id}`, // Pass the template ID as a query parameter
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      const policyBlob = await response.blob();
      const policyUrl = URL.createObjectURL(policyBlob);

      // Display a toast message
      toast.success(`${name} policy created successfully!`);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = policyUrl;
      link.download = `${name}-policy.pdf`;
      link.click();

      // Clean up the temporary URL object
      URL.revokeObjectURL(policyUrl);
      // Clear the input field
      setName("");
    } catch (error) {
      console.error("Error generating the policy document", error);
      // Handle the error condition appropriately
    }
  };

  const isNameValid = name.length > 2;
  const buttonClassNames = `inline-block px-4 py-2 mt-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    isNameValid
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-400 cursor-not-allowed"
  }`;

  return (
    <form onSubmit={handleSubmit} className="mt-4 text-center">
      <label className="block mb-2">
        <input
          type="text"
          placeholder="Enter your company name"
          value={name}
          onChange={handleNameChange}
          className="block mx-auto w-1/2 py-2 border-b border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
        />
      </label>
      <button
        type="submit"
        className={buttonClassNames}
        disabled={!isNameValid}
      >
        Generate Policy Document
      </button>

      {/* Toast container for displaying toast messages */}
      <ToastContainer className="mt-4" />
    </form>
  );
}

export default PolicyForm;
