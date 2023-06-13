import fs from 'fs';
import handlebars from 'handlebars';

function generatePolicyDocument(name, email) {
  // Read the policy template file
  const template = fs.readFileSync('policy-template.hbs', 'utf-8');

  // Compile the template
  const compiledTemplate = handlebars.compile(template);

  // Generate the policy document with user input
  const policyContent = compiledTemplate({ name, email });

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
}

export default generatePolicyDocument;
