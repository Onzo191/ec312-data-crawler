const setupDriver = require("../utils/setup-driver");
const getProductIds = require("../services/get-product-ids");
const getProductUrls = require("../services/get-product-urls");
const {
  fetchProductTiki,
  fetchProductSendo,
} = require("../services/fetch-product-info");
const generateCsv = require("../utils/generate-csv");
const PORT = process.env.PORT || 4000;

const crawlerController = async (req, res) => {
  try {
    const { website, keyword, quantity } = req.body;
    const fileName = await crawlingData(website, keyword, quantity);

    res.status(200).json({
      success: true,
      message: "File CSV đã được tạo thành công.",
      downloadLink: `http://localhost:${PORT}/api/v1/download?fileName=${fileName}`,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred!" });
  }
};

const crawlingData = async (website, keyword, quantity) => {
  const driver = setupDriver();
  let productData;

  if (website === "sendo") {
    const productUrls = await getProductUrls(driver, keyword, quantity);
    productData = await fetchProductSendo(productUrls);
  } else if (website === "tiki") {
    const productIds = await getProductIds(driver, keyword, quantity);
    productData = await fetchProductTiki(productIds);
  } else {
    throw new Error("Website không được hỗ trợ");
  }

  return await generateCsv(productData);
};

module.exports = crawlerController;
