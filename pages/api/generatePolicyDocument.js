import fs from "fs";
import handlebars from "handlebars";

export default async function generatePolicyDocument(req, res) {
  const { name, email } = req.body;

  // Read the policy template file
  const template = fs.readFileSync("./public/policy-template.hbs", "utf-8");

  // Compile the template
  const compiledTemplate = handlebars.compile(template);

  // Generate the policy document with user input
  const policyContent = compiledTemplate({ name, email });

  // Send the policy document as a response
  res.setHeader("Content-Type", "text/plain");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=policy-document.txt"
  );
  res.send(policyContent);
}
