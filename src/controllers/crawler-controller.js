const setupDriver = require("../utils/setup-driver");
const getProductIds = require("../services/get-product-ids");
const getProductUrls = require("../services/get-product-urls");
const { fetchProductTiki, fetchProductSendo } = require("../services/fetch-product-info");
const generateCsv = require("../utils/generate-csv");

const crawlerController = async (website, keyWords, numberOfProducts) => {
  const driver = setupDriver();
  let productData;

  if (website === "sendo") {
    const productUrls = await getProductUrls(
      driver,
      keyWords,
      numberOfProducts
    );
    productData = await fetchProductSendo(productUrls);
  } else if (website === "tiki") {
    const productIds = await getProductIds(driver, keyWords, numberOfProducts);
    productData = await fetchProductTiki(productIds);
  } else {
    throw new Error("Website không được hỗ trợ");
  }

  const csvPath = `src/data/${website}-product.csv`; // Path lưu csv
  await generateCsv(csvPath, productData);
};

module.exports = crawlerController;
