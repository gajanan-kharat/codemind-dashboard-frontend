const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Ensure the reports directory exists
const reportsDir = path.join(__dirname, '../usersReports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// Load the HTML template from the file
const loadTemplate = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

router.post('/generate-usersReport', async (req, res) => {
  try {
    const { usersData } = req.body;
    
    // Path to the HTML template
    const templatePath = path.join(__dirname, '../templates/usersReportTemplate.html');

    // Load the HTML template content
    let content = await loadTemplate(templatePath);

    // Generate table rows from the usersData
    const tableRows = usersData.map((user, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${user.firstname + ' ' + user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.mobile_number}</td>
        <td>${user.role}</td>
      </tr>
    `).join('');

    // Replace the placeholder in the template with the generated table rows
    content = content.replace('<!-- User data will be inserted here -->', tableRows);

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page
    await page.setContent(content);

    // Generate the PDF and save it to the reports directory
    const fileName = `user-report-${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, fileName);
    await page.pdf({ path: filePath, format: 'A4' });

    await browser.close();

    // Send the PDF as a downloadable response
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error sending the PDF:', err);
        res.status(500).send('Error downloading the file');
      }
    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Error generating report');
  }
});

module.exports = router;
