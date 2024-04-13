const { By, until } = require("selenium-webdriver");

const LOCATOR = {
  ITEM_WRAPPER: By.xpath('//a[@target="_blank"]'),
  MORE_BUTTON: By.xpath(
    '//button[contains(@class, "d7ed-YaJkXL") and ./span[contains(text(), "Xem thêm")]]'
  ),
};

const getProductUrls = async (driver, keyWords, numberOfProducts) => {
  let productUrls = [];

  try {
    await driver.get(`https://www.sendo.vn/tim-kiem?q=${keyWords}`);
    await driver.wait(until.elementLocated(LOCATOR.ITEM_WRAPPER), 10000);

    if (numberOfProducts > 60) {
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight)"
      );
      await driver.sleep(5000);
      if (numberOfProducts > 120) {
        for (let counter = numberOfProducts - 120; counter > 0; counter -= 60) {
          await driver.findElement(LOCATOR.MORE_BUTTON).click();
          await driver.sleep(2000);

          const footerBottomY = await driver.executeScript(
            `return document.querySelector('footer').getBoundingClientRect().bottom;`
          );
          const scrollToY = footerBottomY;

          await driver.executeScript(`window.scrollTo(0, ${scrollToY});`);
          await driver.sleep(5000);
        }
      }
    }

    // Lấy danh tất cả sản phẩm trong trang
    let productElements = await driver.findElements(LOCATOR.ITEM_WRAPPER);

    // Lấy url của từng sản phẩm và đẩy vào productUrls
    for (const productElement of productElements) {
      let urlElement = await productElement.getAttribute("href");
      const pattern = /sendo\.vn\/(.*?)\.html/;
      const url = urlElement.match(pattern)[1];

      productUrls.push({ url });
    }

    return productUrls;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
};

module.exports = getProductUrls;
