const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent("<h1>hello</h1>");
    await page.emulateMediaType("screen");
    await page.pdf({
      path: "mypdf.pdf",
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    await browser.close();
    process.exit();
  } catch (error) {
    console.log(error);
  }
})();
