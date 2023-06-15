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
    // Perform form validation and other necessary logic

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

      // Update the policy generation status
      setPolicyGenerated(true);
     } catch (error) {
      console.error("Error generating the policy document", error);
      // Handle the error condition appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <button type="submit">Generate Policy Document</button>

      {/* Toast container for displaying toast messages */}
      <ToastContainer />
    </form>
  );
}

export default PolicyForm;