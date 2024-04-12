const setupDriver = require("./src/setup-driver");
const getProductIds = require("./src/get-product-ids");
const fetchProductInfo = require("./src/fetch-product-info");
const generateCsv = require("./src/generate-csv");

(async () => {
  const driver = setupDriver();
  const keyWords = "Áo mưa"; // Từ khóa cần tìm kiếm
  const numberOfProducts = 50; // Số lượng sản phẩm muốn lấy
  const productIds = await getProductIds(driver, keyWords, numberOfProducts);
  
  const productData = await fetchProductInfo(productIds);

  const csvPath = "./data/tiki-product.csv"; // Path lưu csv
  await generateCsv(csvPath, productData);
})();
