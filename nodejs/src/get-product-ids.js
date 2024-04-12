const { By, until } = require("selenium-webdriver");

const getProductIds = async (driver, keyWords, numberOfProducts) => {
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

module.exports = getProductIds;
