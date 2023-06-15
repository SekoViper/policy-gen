import fs from 'fs';

export default function getPolicies(req, res) {
  const policiesDir = './policies';

  try {
    // Read the list of files in the "policies" directory
    const fileNames = fs.readdirSync(policiesDir);

    // Map the file names to policies with titles
    const policies = fileNames.map((fileName) => {
      // Extract the title from the file name or load it from a separate file or database
      const title = fileName.replace('.pdf', ''); // Example: Remove the '.pdf' extension from the file name

      return { fileName, title };
    });

    res.status(200).json(policies);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).send('Internal Server Error');
  }
}
