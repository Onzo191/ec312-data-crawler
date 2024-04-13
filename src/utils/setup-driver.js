const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const setupDriver = () => {
  const options = new chrome.Options();
  const profilePath = process.env.PROFILE_PATH || "C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data";
  const profileDirectory = process.env.PROFILE_DIRECTORY || "Default";

  options.addArguments(`--user-data-dir=${profilePath}`);
  options.addArguments(`--profile-directory=${profileDirectory}`);
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  driver.manage().window().maximize();

  return driver;
};

module.exports = setupDriver;
