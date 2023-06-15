import fs from "fs";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

export default async function generatePolicyDocument(req, res) {
  const { name } = req.body;
  // const { templateName } = useRouter().query;
  const { templateName } = req.query; // Get the template name from the URL query parameter

  console.log("Generating policy document:", templateName);

  try {
    // Check if the template file exists
    const templatePath = `./public/templates/${templateName}`;
    if (!fs.existsSync(templatePath)) {
      console.error("Template file not found");
      res.status(404).send("Template file not found");
      return;
    }

    // Read the policy template file
    const template = fs.readFileSync(templatePath, "utf-8");

    // Compile the template
    const compiledTemplate = handlebars.compile(template);

    // Generate the policy document with user input
    const policyContent = compiledTemplate({ name });

    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(policyContent);

    // Generate PDF from the page
    const pdfBuffer = await page.pdf();

    await browser.close();

    // Set the response headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="policy.pdf"`);

    // Send the PDF buffer as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating policy document:", error);
    res.status(500).send("Internal Server Error");
  }
}
