require("dotenv").config({ path: "src/config/.env" });
const crawlerController = require("./src/controllers/crawler-controller");

(async () => {
  const website = "sendo";
  const keyWords = "Áo mưa, ô dù và phụ kiện đi mưa"; // Từ khóa cần tìm kiếm
  const numberOfProducts = 50; // Số lượng sản phẩm muốn lấy
  crawlerController(website, keyWords, numberOfProducts);
})();
