import React, { useEffect, useState } from 'react';

const Policies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch the list of policies from the server
    fetch('/api/getPolicies')
      .then((response) => response.json())
      .then((data) => setPolicies(data))
      .catch((error) => console.error('Error fetching policies:', error));
  }, []);

  const handleShareButtonClick = (fileName) => {
    // Implement the logic to share the policy
    console.log('Sharing policy:', fileName);
  };

  const handleDeleteButtonClick = (fileName) => {
    // Send a request to the server to delete the policy
    fetch(`/api/deletePolicy?fileName=${fileName}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Update the policies list after successful deletion
          setPolicies((prevPolicies) => prevPolicies.filter((policy) => policy.fileName !== fileName));
        } else {
          console.error('Failed to delete policy:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting policy:', error));
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
              <button onClick={() => handleShareButtonClick(policy.fileName)}>Share</button>
              <button onClick={() => handleDeleteButtonClick(policy.fileName)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Policies;
