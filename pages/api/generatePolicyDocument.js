import fs from "fs";
import handlebars from "handlebars";
import puppeteer from "puppeteer";

export default async function generatePolicyDocument(req, res) {
  const { name, email } = req.body;

  // Read the policy template file
  const template = fs.readFileSync("./public/policy-template.hbs", "utf-8");

  // Compile the template
  const compiledTemplate = handlebars.compile(template);

  // Generate the policy document with user input
  const policyContent = compiledTemplate({ name, email });

  // Generate a unique file name for the policy document
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  const fileName = `${name.replace(
    /\s/g,
    "-"
  )}-policy-${day}-${month}-${year}.pdf`;

  // Create the "policies" directory if it doesn't exist
  const policiesDir = "./policies";
  if (!fs.existsSync(policiesDir)) {
    fs.mkdirSync(policiesDir);
  }

  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(policyContent);

    // Generate PDF from the page
    const pdfBuffer = await page.pdf();

    // Save the PDF file in the 'policies' directory
    const filePath = `${policiesDir}/${fileName}`;
    fs.writeFileSync(filePath, pdfBuffer);

    await browser.close();

    // Send a success response
    res.status(200).json({ fileName });
  } catch (error) {
    console.error("Error generating policy document:", error);
    res.status(500).send("Internal Server Error");
  }
}
