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

    // CODE O DAY NHA PHUOC
    // CODE O DAY NHA PHUOC
    // CODE O DAY NHA PHUOC

    return productUrls;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
};

module.exports = getProductUrls;
