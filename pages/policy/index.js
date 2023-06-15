import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch the list of policies from the server
    fetch("/api/getPolicies")
      .then((response) => response.json())
      .then((data) => setPolicies(data))
      .catch((error) => console.error("Error fetching policies:", error));
  }, []);

  const handleShareButtonClick = (fileName) => {
    // Get the list of recipients from the user or any other source
    const recipients = ["email1@example.com", "email2@example.com"];

    // Send a request to the server to share the policy
    fetch("/api/sharePolicy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, recipients }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Policy shared successfully!");
          // Handle the success condition, such as displaying a success message
          toast.success("Policy shared successfully!");
        } else {
          console.error("Failed to share policy:", response.status);
          // Handle the error condition appropriately
          toast.error("Failed to share policy");
        }
      })
      .catch((error) => {
        console.error("Error sharing policy:", error);
        toast.error("Error sharing policy");
      });
  };

  const handleDeleteButtonClick = (fileName) => {
    // Send a request to the server to delete the policy
    fetch(`/api/deletePolicy?fileName=${fileName}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update the policies list after successful deletion
          setPolicies((prevPolicies) =>
            prevPolicies.filter((policy) => policy.fileName !== fileName)
          );
          toast.success(`${fileName} Policy deleted successfully!`);
        } else {
          console.error("Failed to delete policy:", response.status);
          toast.error("Failed to delete policy");
        }
      })
      .catch((error) => {
        console.error("Error deleting policy:", error);
        toast.error("Error deleting policy");
      });
  };

  return (
    <div>
      <h2>Policies</h2>
      {policies.length === 0 ? (
        <p>No policies available.</p>
      ) : (
        <ul>
          {policies.map((policy) => (
            <li key={policy.fileName}>
              <span>{policy.title}</span>
              <button onClick={() => handleShareButtonClick(policy.fileName)}>
                Share
              </button>
              <button onClick={() => handleDeleteButtonClick(policy.fileName)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default Policies;
