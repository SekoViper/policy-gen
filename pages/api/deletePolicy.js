import fs from 'fs';
import path from 'path';

export default function deletePolicy(req, res) {
  const { fileName } = req.query;

  // Construct the file path
  const filePath = path.join(process.cwd(), 'policies', fileName);

  // Check if the policy file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: 'Policy not found' });
    return;
  }

  try {
    // Delete the policy file
    fs.unlinkSync(filePath);
    res.status(200).json({ message: 'Policy deleted successfully' });
  } catch (error) {
    console.error('Error deleting policy:', error);
    res.status(500).json({ message: 'Failed to delete policy' });
  }
}
