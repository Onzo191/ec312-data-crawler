require("dotenv").config();
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const csv = require("csv-parser");

const setupDriver = () => {
  const options = new chrome.Options();

  const profilePath =
    process.env.PROFILE_PATH ||
    "C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data";
  const profileDirectory = process.env.PROFILE_DIRECTORY || "Default";

  options.addArguments(`--user-data-dir=${profilePath}`);
  options.addArguments(`--profile-directory=${profileDirectory}`);

  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  driver.manage().window().maximize();

  return driver;
};

const getProductUrls = async () => {
  let driver = setupDriver();
  let productUrls = [];
  const keyWords = "Áo mưa";
  // Số lượng sản phẩm muốn lấy
  const numberOfProducts = 50;

  try {
    for (let i = 1; productUrls.length <= numberOfProducts; i++) {
      await driver.get(`https://tiki.vn/search?q=${keyWords}&page=${i}`);
      await driver.wait(
        until.elementLocated(
          By.xpath('//a[@data-view-id="product_list_item"]')
        ),
        10000
      );

      // Lấy danh tất cả sản phẩm trong trang
      let productElements = await driver.findElements(
        By.className("product-item")
      );

      // Lấy url của từng sản phẩm và đẩy vào productUrls
      for (const productElement of productElements) {
        let url = await productElement.getAttribute("href");

        productUrls.push({ url });
      }
    }

    return productUrls;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
};

const writeProductToCsv = async (productData) => {
  const csvContent = `${productData.title},${productData.price},${productData.description}\n`;
  await fs.appendFile(csvFilePath, csvContent, "utf8");
};

const getProductInformation = async (productUrl) => {
  let driver = setupDriver();
  let productData = {};

  try {
    await driver.get(productUrl);

    // Extract product title (modify selectors as needed)
    const titleElement = await driver.findElement(By.css(".title"));
    productData.title = await titleElement.getText();

    // Extract product price
    const priceElement = await driver.findElement(By.css(".price"));
    productData.price = await priceElement.getText();

    // Extract product description (modify selectors as needed)
    const descriptionElement = await driver.findElement(By.css(".description"));
    productData.description = await descriptionElement.getText();

    // Write extracted data to CSV
    await writeProductToCsv(productData);
  } catch (error) {
    console.error(`Error processing product: ${productUrl}`, error);
  } finally {
    await driver.quit();
  }
};

const csvFilePath = "tiki_product_urls.csv";
(async () => {
  const productUrls = await getProductUrls();

  for (const product of productUrls) {
    await getProductInformation(product.url);
  }
})();
