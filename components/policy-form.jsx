import React, { useState } from 'react';

function PolicyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation and other necessary logic

    try {
      const response = await fetch('/api/generatePolicyDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const policyContent = await response.text();

      // Create a downloadable file
      const fileName = 'policy-document.txt';
      const fileContent = new Blob([policyContent], { type: 'text/plain' });
      const fileURL = URL.createObjectURL(fileContent);

      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = fileName;
      downloadLink.click();

      // Clean up the URL object after the download
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Error generating or downloading the policy document', error);
      // Handle the error condition appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button type="submit">Generate Policy Document</button>
    </form>
  );
}

export default PolicyForm;
