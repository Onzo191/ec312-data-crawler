const setupDriver = require("./src/setup-driver");
const getProductUrls = require("./src/get-product-urls");
const { fetchProductSendo } = require("./src/fetch-product-info");
const generateCsv = require("./src/generate-csv");

(async () => {
  const driver = setupDriver();
  const keyWords = "Áo mưa, ô dù và phụ kiện đi mưa"; // Từ khóa cần tìm kiếm
  const numberOfProducts = 50; // Số lượng sản phẩm muốn lấy
  const productUrls = await getProductUrls(driver, keyWords, numberOfProducts);
  
  const productData = await fetchProductSendo(productUrls);

  const csvPath = "./data/sendo.csv"; // Path lưu csv
  await generateCsv(csvPath, productData);
})();
