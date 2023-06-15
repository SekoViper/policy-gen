import React, { useEffect, useState } from 'react';

import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

const Policy = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch the list of template files from the server
    fetch('/api/getTemplates')
      .then((response) => response.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error('Error fetching templates:', error));
  }, []);

  const handleTemplateClick = (template) => {
    const policyFormUrl = `/${template}`;
    window.location.href = policyFormUrl;
  };

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4">Policy Templates</h2>
      {templates.length === 0 ? (
        <p>No templates available.</p>
      ) : (
        <ul className='flex justify-evenly'>
          {templates.map((template) => (
            <li key={template}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleTemplateClick(template)}
              >
                {template}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Policy;
