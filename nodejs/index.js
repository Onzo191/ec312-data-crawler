require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { createObjectCsvWriter } = require("csv-writer");
const htmlMinifier = require("html-minifier");
const axios = require("axios");
axios.defaults.responseEncoding = "utf8";
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
};

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

const getproductIds = async (keyWords, numberOfProducts) => {
  let driver = setupDriver();
  let productIds = [];

  try {
    for (let i = 1; productIds.length <= numberOfProducts; i++) {
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

      // Lấy url của từng sản phẩm và đẩy vào productIds
      for (const productElement of productElements) {
        // Lấy id và spid từ attribute 'data-view-content'
        let idElement = await productElement.getAttribute("data-view-content");
        const jsonIdElement = JSON.parse(idElement);
        const id = jsonIdElement.click_data.id;
        const spid = jsonIdElement.click_data.spid;

        productIds.push({ id, spid });
      }
    }

    return productIds;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
};

const fetchProductInfo = async (productIds) => {
  let productData = [];

  try {
    for (const [index, productId] of productIds.entries()) {
      if (index % 50 === 0) {
        console.log('Pausing for 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
      const url = `https://tiki.vn/api/v2/products/${productId.id}?spid=${productId.spid}`;
      try {
        const { data: responseData } = await axios.get(url);
      const {
        sku,
        name,
        original_price: price,
        description,
        images,
        brand: { name: brand_name },
        categories: { name: category },
      } = responseData;
      const image_urls = images.map((image) => image.base_url).join(",");
      const cleanedDescription = htmlMinifier.minify(
        description,
        minifyOptions
      );
      productData.push({
        sku,
        name,
        price,
        description: cleanedDescription,
        image_urls,
        brand_name,
        category,
      });
      console.log(`#${index + 1} Product's SKU: ${sku}`);
      } catch(error) {
        console.log(`#${index + 1} Error`);
      }
    }

    return productData;
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

const generateCsv = (productData) => {
  const csvWriter = createObjectCsvWriter({
    path: "product_data.csv",
    header: [
      { id: "sku", title: "SKU" },
      { id: "name", title: "Name" },
      { id: "price", title: "Price" },
      { id: "description", title: "Description" },
      { id: "image_urls", title: "Image URLs" },
      { id: "brand_name", title: "Brand Name" },
      { id: "category", title: "Category" },
    ],
    encoding: "utf8",
  });

  csvWriter
    .writeRecords(productData)
    .then(() => console.log(`CSV file (${productData.length} lines) has been written successfully`))
    .catch((error) => console.error("Error writing CSV:", error));
};

const csvFilePath = "tiki_product_urls.csv";
(async () => {
  const keyWords = "Áo mưa"; // Từ khóa cần tìm kiếm
  const numberOfProducts = 500; // Số lượng sản phẩm muốn lấy
  const productIds = await getproductIds(keyWords, numberOfProducts);
  const productData = await fetchProductInfo(productIds);
  await generateCsv(productData);
})();
