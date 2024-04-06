require("dotenv").config();
const { Builder, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

function setupDriver() {
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
}

async function runBot() {
  try {
    let driver = setupDriver();
    await driver.get("https://www.tiki.vn/");
    await driver.sleep(3000);

    await driver.quit();

    console.log("Test");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

runBot()
// module.exports = {
//   runBot: runBot,
// };

