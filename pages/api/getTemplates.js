import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const templatesDir = path.join(process.cwd(), 'public', 'templates');

  // Read the template directory
  fs.readdir(templatesDir, (err, files) => {
    if (err) {
      console.error('Error reading template directory:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Filter out non-template files
    const templateFiles = files.filter((file) => file.endsWith('.hbs'));

    // Send the list of template files as the response
    res.status(200).json(templateFiles);
  });
}
